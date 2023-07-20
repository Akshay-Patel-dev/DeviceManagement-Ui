<template>
    <v-container>

        <v-alert v-model="showAlert" color="success top-right-alert" icon="$success" dismissible>
            Data saved successfully!
        </v-alert>

        <v-breadcrumbs :items="items" style="custom-breadcrumbs" elevation="1">
        </v-breadcrumbs>

        <v-container class=" flex-column justify-center  align-center ">
            <v-btn @click="Createform"
                style="font-family:'Times New  Roman'; background-color:#004D40; color:white; margin-bottom:1rem;">Add Employee </v-btn>
            <ag-grid-vue :style="gridStyle" class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
                :gridOptions="gridOptions" :defaultColDef="defaultColDef" @grid-ready="onGridReady">
            </ag-grid-vue>

        </v-container>



        <v-dialog v-model="showDelete" persistent width="auto">
            <v-card>
                <v-card-title class="text-h6">
                    Are you sure you want to delete?
                </v-card-title>
                <v-card-text>All data related to employee such as devices will also deleted.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="showDelete = false">
                        Disagree
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="deletedata">
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="dialog" persistent width="1024">
            <v-form ref="myForm" >
                <v-card style="border-radius: 10px;">
                    <v-card-title>
                        <span style="font-family: 'Times New  Roman'; font-wieght:bold;">Employer Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label=" Name*" v-model="name" :rules="nameRules"   required></v-text-field>
                                </v-col>


                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Email*" v-model="email" :rules="emailRules"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label=" Department"  v-model="department" :rules="departmentRules" required></v-text-field>
                                </v-col>


                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Designation"  v-model="designation" :rules="designationRules" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Employe Code"  :rules="empCodeRules" v-model="empCode" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Date of joining" type="date" min="1980-01-01" max="2024-01-01" v-model="doj" :rules="dojRules" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="Close">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text"  @click="Save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>

<script>

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios'


export default {
    name: "App",

    data() {
        return {
            gridApi: null,
            columnDefs: null,
            rowData: null,
            defaultColDef: {
                resizable: true,
            },
            gridStyle: {
                width: "71%",
                height: "559.5px",
                "font-family": 'Times New Roman',
            },
            showAlert: false,
            data: {},
            dialog: false,
            gridOptions: {
                onCellClicked: this.onCellClicked,
                suppressCellFocus: true,
                autoSizePadding: true,
            },
            name: null,
            items: [
                {
                    text: 'Home',
                    to: '/home',
                },
                {
                    text: 'Employees',
                    to: '/employees',
                },


            ],
            nameRules: [
                value => {
                    if (value != null) {
                        return true
                    }
                    return 'Name is requred.'
                },
                value => {
                    if (/^[a-zA-Z ]+$/.test(value))   return true
                    
                    return 'Name must be valid.'
                },
            ],
            deltewarn: null,
            email: null,
            emailRules:
                [
                    value => {
                        if (value != null) return true

                        return 'E-mail is requred.'
                    },
                    value => {
                        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

                        return 'E-mail must be valid.'
                    },
                ],
            department: null,
            departmentRules:
            [
                value => {
                        if (value == null) {
                        return "Department Name is required"; 
                        }
                        if (/^[a-zA-Z\s]+$/.test(value)) {
                            return true;
                        }else {
                            return "Numbers and  special characs not allowed";
                        }
                       
                    }
            ],
            designation: null,
            designationRules:
            [
                value => {
                        if (value == null) {
                        return "designation must be required"; 
                        }
                        if (/^[a-zA-Z\s]+$/.test(value)) {
                            return true;
                        }else {
                            return "Numbers and  special characs not allowed";
                        }
                       
                    }
            ],
            empCode: null,
            empCodeRules:
            [
                value => {
                        if (!value) {
                        return true; 
                        }
                        if (/^[a-zA-Z0-9]+$/.test(value)) {
                            return true;
                        }else {
                            return "  special characs not allowed";
                        }
                       
                    }
            ],
            doj: null,
            minDate: new Date('1980-01-01'),
             maxDate: new Date('2024-12-31'),
            dojRules:
                [   
                    value => {
                        if (!value) {
                        return true; 
                        }
                        const dateValue = new Date(value);
                        if (isNaN(dateValue.getTime())) {
                        return "Invalid date format."; 
                        }
                        if (dateValue < this.minDate || dateValue > this.maxDate) {
                        return `Date must be between ${this.minDate.toLocaleDateString()} and ${this.maxDate.toLocaleDateString()}.`; 
                        }
                        return true; 
                    }
                ],
            id: null,
            mode: 'create',
            showDelete: null,
            employedDevices: null,
        };
    },

    created() {
        axios.get("https://localhost:7155/api/Employees").
            then((response) => {
                this.rowData = response.data;

            })
    },

    components: {
        AgGridVue,
    },

    beforeMount() {
        this.columnDefs = [
            { field: "name", sortable: true, filter: true, floatingFilter: true, },
            { field: "email", sortable: true, filter: true, floatingFilter: true, },
            { field: "department", sortable: true, filter: true, floatingFilter: true, },
            { field: "designation", sortable: true, filter: true, floatingFilter: true, },
            { headerName: "Employee code", field: "empCode", sortable: true, filter: true, floatingFilter: true, },
            {
                headerName: 'Devices',
                field: 'actions',
                cellRenderer: function () {

                    var deleteButton = '<button class="mdi mdi-tablet-cellphone "  data-action="view"></button>';
                    return deleteButton;
                },
                cellStyle: { 'text-align': 'center' },
                width: 100
            },
            {
                headerName: 'Edit',
                field: 'actions',
                cellRenderer: function () {
                    var editButton = '<button  class="mdi mdi-account-edit-outline" data-action="edit"></button>';

                    return editButton;
                },
                width: 100,
                cellStyle: { 'text-align': 'center' }
            },
            {
                headerName: 'Delete',
                field: 'actions',
                cellRenderer: function () {

                    var deleteButton = '<button class="mdi mdi-delete"  data-action="delete"></button>';
                    return deleteButton;
                },
                cellStyle: { 'text-align': 'center' },
                width: 100
            },

        ];
    },

    methods: {
        onCellClicked: function (event) {
            if (event.column.colDef.field === 'actions') {
                var action = event.event.target.getAttribute('data-action');
                if (action === 'edit') {
                    this.mode = 'edit'
                    this.dialog = true;
                    this.Editdevicedata(event.data);
                } else if (action === 'delete') {
                    this.id = event.data.employeeId;
                    this.showDelete = true;

                }
                else if (action === 'view') {

                    this.$router.push(`/employees/${event.data.employeeId}/device`);
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
        },

       
        Editdevicedata(rowdata) {
            this.name = rowdata.name;
            this.email = rowdata.email;
            this.designation = rowdata.designation;
            this.empCode = rowdata.empCode;            
            this.department = rowdata.department;
            this.id = rowdata.employeeId;
            if (rowdata.doj != null) {
                this.doj = rowdata.doj.slice(0, 10);
            }
            console.log(this.doj)
        },


      async  Save() {
            let formvalid = await this.$refs.myForm.validate()
          
                if(formvalid.valid){
                this.data.name = this.name;
                this.data.email = this.email;
                this.data.designation = this.designation;
                this.data.empCode = this.empCode;
                var doj1 = this.doj;
                this.data.doj = doj1;
                this.data.department = this.department;
                let id = this.id;

                console.log(JSON.stringify(this.data))
                if (this.mode == 'edit') {
                    axios.put(`https://localhost:7155/api/Employees/${id}`, this.data).then(response => {
                        console.log(response.data);
                        this.Close();
                        this.refreshedrow();

                    })
                        .catch(error => {
                            console.log(error);
                        });
                }

                if (this.mode == 'create') {
                    axios.post(`https://localhost:7155/api/Employees`, this.data).then(response => {
                        console.log(response.data);
                        this.Close();
                        this.refreshedrow();
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 3000);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
            else {
                console.log("form data is invalid")
            }
       
        },

        Close() {
            this.$refs.myForm.reset();
            this.dialog = false;

        },

        deletedata() {

            if (this.showDelete == true) {
                axios.delete(`https://localhost:7155/api/Employees/${this.id}`).then(response => {
                    console.log(response.data);

                    this.refreshedrow();
                })
                    .catch(error => {
                        console.log(error);
                    });
            }
            this.showDelete = false;
        },

        refreshedrow() {
            axios.get("https://localhost:7155/api/Employees").
                then((response) => {
                    this.rowData = response.data;
                })
        }
    }
};
</script>


<style>
.table-container {
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.ag-theme-alpine {
    --ag-header-background-color:none;

}


.create-button {
    background-color: #004D40;
}

.custom-breadcrumbs {
    width: 90%;
    background-color: blue;
}

.ag-row {
    background: white !important;
    background-image: none !important;
  } 

.ag-root-wrapper {

    border-radius: 5px;
}

.create-button {
    padding-bottom: 2rem;
}

.grid-container {
    padding: 4rem;
}


</style>