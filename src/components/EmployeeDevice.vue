<template>
    <v-container>
        <v-breadcrumbs :items="items" style="custom-breadcrumbs">
        </v-breadcrumbs>
        <v-container>
            <!-- <h3> Employee Name : {{employeedata.name}}</h3>
            <h3> Employee Code : {{employeedata.empCode}}</h3>
            <h3> Employee email : {{employeedata.email}}</h3> -->
        </v-container>
        <v-container class=" flex-column justify-center  align-center ">
            <v-btn @click="Createform"
                style="font-family:'Times New Roman'; background-color:#004D40; color:white; margin-bottom:1rem;">Assign New
                Device</v-btn>
            <ag-grid-vue :style="gridStyle" class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
                :gridOptions="gridOptions" :defaultColDef="defaultColDef" @grid-ready="onGridReady">
            </ag-grid-vue>
        </v-container>
        <v-dialog v-model="showDelete" persistent width="auto">
            <v-card>
                <v-card-title class="text-h6">
                    Are you sure you want to Unassign Device?
                </v-card-title>
                <v-card-text>Device will be unassigned </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="showDelete = false">
                        Cancel
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="deletedata">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog"  persistent 
        width="25%">
        <v-card style="border-radius: 10px;">
            <v-card-title  >
              <span style="font-family: 'Times New Roman'; font-wieght:bold;">Available device</span> 
              </v-card-title>
              <ag-grid-vue :style="dialogGridStyle" class="ag-theme-alpine" :columnDefs="dialogColms" :rowData="dialogRowdata"
              :gridOptions="gridOptionsdialog"  :rowSelection="rowSelection" @grid-ready="onGridReady">
          </ag-grid-vue>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="assign"
                >
                  Assign Device
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
            

    </v-container>
    
</template>
  
<script>

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios'


export default {
    name: "EmployeeDevice",

    
    data() {
        return {
            gridApi: null,
            columnDefs: null,
            dialogColms: null,
            rowData: null,
            dialogRowdata: null,
            defaultColDef: {
                resizable: true,
            },
            
            gridStyle: {
               width:"75%",
                height: "550px",
                "font-family": 'Times New Roman',
            },
            dialogGridStyle: {
               width:"80%",
                height: "420px", 
                padding:"1rem",
               "margin-left":"10%",
                "font-family": 'Times New Roman',
            },
            showAlert: false,
            data: null,
            selectedItems: [],
            dialog: false,
            gridOptions: {
                onCellClicked: this.onCellClicked,
                suppressCellFocus: true,
                autoSizePadding: true,
            },
            gridOptionsdialog:{
                onCellClicked: this.onCellClicked,
                suppressCellFocus: true,
                autoSizePadding: true,
            },
            employeedata:null,
            mobileModel: null,
            company: null,
            rowSelection: null,
            items: [
                {
                    text: 'Home',
                    to: '/home',
                },
                {
                    text: 'Employees',
                    to: '/employees',
                },
                {
                    text: 'Devices',
                    to: '/employees/:id/device',
                },

            ],
            serialNumber: null,
            opratingSystem: null,
            purchaseDate: null,
            warrantyMonths: null,
            id: null,
            mode: 'create',
            showDelete: null
        };

    },

    created() {
        let id = this.$route.params.id;

        axios.get(`https://localhost:7155/api/Employees/${id}/devices/active`).
            then((response) => {
                this.rowData = response.data;
                
            })

        axios.get(`https://localhost:7155/api/Employees/${id}`).
            then((response) => {
                 this.employeedata = response.data;
                this.items[1].text = response.data.name;
            })
    },

    components: {
        AgGridVue,
    },

    beforeMount() {
        this.columnDefs = [
            { field: "mobileModel", sortable: true, filter: true, floatingFilter: true, },
            { field: "company", sortable: true, filter: true, floatingFilter: true, },
            {
                headerName: 'Assign Date',
                field: 'allotmentDate',
                filter: 'agDateColumnFilter',
                floatingFilter: true,
                sortable: true,
                valueFormatter: (params) => {
                    console.log(params.data)
                    const date = new Date(params.data.allotmentDate);
                    return date.toLocaleDateString();
                },


            },
            { headerName: 'Warranty left ', field: "warrantyMonths", sortable: true, filter: true, floatingFilter: true,
            valueFormatter: (params) => {
                let date = new Date(params.data.purchaseDate);
                    let month = date.getMonth();
                    let warrantyLeft = params.data.warrantyMonths - month;
                    if (params.data.warrantyMonths == null) return "No warranty"
                    return warrantyLeft;
                    
                },
            },
            {
                headerName: 'Unassign Device',
                field: 'actions',
                cellRenderer: function () {

                    var deleteButton = '<button class="mdi mdi-delete"  data-action="delete"> Unassign device</button>';
                    return deleteButton;
                },
                cellStyle: { 'text-align': 'center' },
                width: 136
            }
        ];

        
    },

    methods: {
        onCellClicked: function (event) {
            if (event.column.colDef.field === 'actions') {
                var action = event.event.target.getAttribute('data-action');
                 if (action === 'delete') {
                    this.id = event.data.assignmentId;
                    console.log(event.data.assignmentId)
                    this.showDelete = true;

                }
            }
        },

        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            this.gridApi.sizeColumnsToFit()
        },


        Createform() {
            this.dialog = true;
            this.mode = 'create';
            this.rowSelection = 'single'
            this.dialogColms = [
            { field: "mobileModel", sortable: true, filter: true, floatingFilter: true, },
            { field: "company", sortable: true, filter: true, floatingFilter: true, },
            
        ];

        axios.get("https://localhost:7155/devices/active").
                then((response) => {
                    this.dialogRowdata = response.data;
                   
                })
        
        },

        deletedata() {
            
            if (this.showDelete == true) {
                
                axios.delete(`https://localhost:7155/api/Assignments/${this.id}`).then(response => {
                    this.refreshedrow();
                })
                    .catch(error => {
                        console.log(error);
                    });
            }
            this.showDelete = false;
        },

        assign(){
            let deviceid = this.gridApi.getSelectedRows()[0].deviceId; 
             let employid = this.$router.currentRoute._value.params.id;
             let data = {
                deviceId : deviceid,
                employeeId: employid,
             };
            axios.post("https://localhost:7155/api/Assignments",data).
                then(() => {
                    this.refreshedrow();
                    this.dialog= false;
                   
                })    
        },

        refreshedrow() {
            let id = this.$route.params.id;
            axios.get(`https://localhost:7155/api/Employees/${id}/devices/active`).
            then((response) => {
                 this.rowData = response.data;  
                 
            })
             .catch(error => {
            console.log(error);
            });    
        }

    },
};
</script>
  
  
<style scoped>
.table-container {
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}



.create-button {
    background-color: #004D40;
}

.custom-breadcrumbs {
    width: 90%;
    background-color: blue;
}


.ag-root-wrapper {
    padding: 3px;
    border: 1px solid #ccc;
    /* Set the border to the desired style */
    border-radius: 15px;
    /* Add a rounded border */
}

.create-button {
    padding-bottom: 2rem;
}

.grid-container {
    padding: 4rem;
}

.ag-root-wrapper-body::-webkit-scrollbar {
    width: 10px;
    background: #f0f0f0;
}

.ag-root-wrapper-body::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 5px;
}

.warn {
    width: 30%;
    display: block;
}

.table-selected {
    background-color: #e1f5fe; /* Change the background color to show selection */
    cursor: pointer; /* Change cursor to pointer on hover */
  }
</style>