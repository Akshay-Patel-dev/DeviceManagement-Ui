<template>
    
    <v-container >
        <v-alert v-model="showAlert"  color="success top-right-alert"
        icon="$success" dismissible >
            Data saved successfully!
          </v-alert>
            <v-breadcrumbs :items="items" style="custom-breadcrumbs">
            </v-breadcrumbs>
       
        
  
       
    <v-container class=" flex-column justify-center  align-center ">
        <v-btn @click="Createform" style="font-family:'Times  New  Roman'; background-color:#004D40; color:white; margin-bottom:1rem;"  >Add New Device</v-btn>
        <ag-grid-vue :style="gridStyle" class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
            :gridOptions="gridOptions" :defaultColDef="defaultColDef"  @grid-ready="onGridReady" >
        </ag-grid-vue>
    
    </v-container>
  
    <v-dialog
      v-model="showDelete"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h6">
          Are you sure you want to delete?
        </v-card-title>
        <v-card-text>All data related to employee such as devices will also deleted.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="showDelete = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="deletedata"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  
        <v-dialog v-model="dialog" persistent width="1024">

            <v-form ref="form">
            <v-card style="border-radius: 10px;">
                <v-card-title style="font-family: 'Times New  Roman'; font-wieght:bold;">
                    <span >Devices</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label=" Mobile Name*" v-model="mobileModel" :rules="mobileModelRules"  required></v-text-field>
                            </v-col>
  
  
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Company*" v-model="company" :rules="companyRules" required></v-text-field>
                            </v-col>
                            
  
  
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Serial Number*" v-model="serialNumber" :rules="serialNumberRules" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Operating System*" :rules="opratingSystemRules" v-model="opratingSystem"  required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Purchase Date*" type="date" min="2023-01-01" max="2023-07-31" v-model="purchaseDate" :rules="purchaseDateRules" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Warranty Period" type="number"  max="24" v-model="warrantyMonths" :rules="warrantyMonthsDateRules" required></v-text-field>
                            </v-col>
                            
                        </v-row>
                    </v-container>
                   
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="Close">
                        Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="Save">
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
    name: "Devices",
  
    data() {
        return {
            gridApi:null,
            columnDefs: null,
            rowData: null,
            defaultColDef: {
                    resizable: true,
                },
            gridStyle:{
                width: "90%",
                height: "559.5px", 
                "font-family": 'Times New Roman',
            },
            showAlert:false,
            data: {},
            dialog: false,
            gridOptions: {
                onCellClicked: this.onCellClicked,
                suppressCellFocus: true,
                autoSizePadding: true,
            },
            mobileModel: null,
            mobileModelRules:
            [
                value => { 
                            if (value == null) {
                                return "Mobile model name must be required"
                            }
                            if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                            return true;
                            }else {
                            return "Special Characters not allowed";
                             }
                    },
            ],
            company:null,
            items:[
        {
          text: 'Home',
         
          to: '/home',
        },
        {
          text: 'Devices',
          
          to: '/devices',
        },
       
      ],
        serialNumber: null,
        serialNumberRules:
        [  
            value => { 
                            if (value == null) {
                                return "Serial Number must be required"
                            }
                            if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                            return true;
                            }else {
                            return "Special Characters not allowed";
                             }
                    },
        ],
        opratingSystem: null,
        opratingSystemRules:
        [
            value => {      if (value == null) {
                                return "Operating System name must be required"
                            }
                            if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                            return true;
                            }else {
                            return "Special Characters not allowed";
                             }
                    },
        ],
        companyRules:
        [
            value => { 
                            if (value == null) {
                                return "company name must be required"
                            }
                            if (/^[a-zA-Z\s]+$/.test(value)) {
                            return true;
                            }else {
                            return "Number and special characs are not allowed";
                             }
                    },
        ],
        purchaseDate: null,
        minDate: new Date('2023-01-01'),
         maxDate: new Date('2023-07-31'),
        purchaseDateRules:
        [
            value => {  
                        if(value == null){
                            return "purchase date must be required"
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
        warrantyMonths: null,
        warrantyMonthsDateRules:
        [
            value => {
                        if (!value) {
                        return true; 
                        }
                        
                       
                        if (value > 36) {
                        return `please write valid warranty period`; 
                        }
                        return true; 
                    }
        ],
            id: null,
            mode: 'create',
            showDelete:null
        };
        
    },
  
    created() {
        axios.get("https://localhost:7155/api/Devices").
            then((response) => {
                this.rowData = response.data;
                
            })
    },
  
    components: {
        AgGridVue,
    },
  
    beforeMount() {
        this.columnDefs = [
            { field: "mobileModel", sortable: true, filter: true, floatingFilter: true, },
            { field: "company", sortable: true, filter: true, floatingFilter: true, },
            { field: "serialNumber", sortable: true, filter: true, floatingFilter: true, },
            { field: "opratingSystem", sortable: true, filter: true, floatingFilter: true, },
            {
          headerName: 'Purchase Date',
          field: 'purchaseDate',
          filter: 'agDateColumnFilter',
          floatingFilter:true,
          sortable: true,
          valueFormatter: (params) => {
            const date = new Date(params.data.purchaseDate);
            return date.toLocaleDateString();
          },
          
          
        },
        {
          headerName: 'Avaliablity',
          field: 'assignedTo',
          filter: true,
          floatingFilter:true,
          sortable: true,
          valueFormatter: (params) => {
            let value =  params.data.assignedTo;
           if (value == null ) return 'Yes'
           return 'No'
          },
          
          
        },
            {  headerName:'Warranty Left',field: "warrantyMonths", sortable: true, filter: true, floatingFilter: true, 
            valueFormatter: (params) => {
                let date = new Date(params.data.purchaseDate);
                    let month = date.getMonth();
                    
                    let warrantyLeft = params.data.warrantyMonths - month;
                    if(warrantyLeft < 0) return 'No warranty';
                    return warrantyLeft;
                    
                },
            },
            {
                headerName: 'History',
                field: 'actions',
                cellRenderer: function () {
                    var editButton = '<button class="mdi mdi-archive-eye " data-action="view"> </button>';
  
                    return editButton;
                },
                width:136,
                cellStyle: { 'text-align': 'center' }
            },
            {
                headerName: 'Edit',
                field: 'actions',
                cellRenderer: function () {
                    var editButton = '<button class="mdi mdi-account-edit-outline" data-action="edit"> </button>';
  
                    return editButton;
                },
                width:100,
                cellStyle: { 'text-align': 'center' }
            },
            {
                headerName: 'Delete',
                field: 'actions',
                cellRenderer: function () {
  
                    var deleteButton = '<button class="mdi mdi-delete"  data-action="delete"> </button>';
                    return deleteButton;
                },
                cellStyle: { 'text-align': 'center' },
                width:100
            }
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
                    this.id = event.data.deviceId;
                    this.showDelete = true;
                    
                }
                else if (action === 'view') {
                        this.$router.push(`/devices/${event.data.deviceId}/assignments`);
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
            this.mobileModel = rowdata.mobileModel;
            this.company = rowdata.company;
            this.serialNumber = rowdata.serialNumber;
            this.opratingSystem = rowdata.opratingSystem;
            this.warrantyMonths = rowdata.warrantyMonths;
            this.id = rowdata.deviceId;
            this.purchaseDate = rowdata.purchaseDate
           
            console.log(this.purchaseDate)
        },
  
  
       async Save() {
            let formvalid = await this.$refs.form.validate()
            if (formvalid.valid) {
            this.data.mobileModel = this.mobileModel;
            this.data.company    = this.company;
            this.data.serialNumber = this.serialNumber;
            this.data.opratingSystem = this.opratingSystem;
            var str1 = this.purchaseDate;
            console.log(str1)
            // var dt1   = parseInt(str1.substring(8,10));
            // console.log(dt1)
            // var mon1  = parseInt(str1.substring(5,8));
            // console.log(mon1)
            // var yr1   = parseInt(str1.substring(0,4));
            // console.log(yr1)
            // var date1 = new Date(yr1, mon1-1, dt1-1);
            // console.log(date1)
            // this.data.purchaseDate = date1
            this.data.purchaseDate = str1;
            this.data.warrantyMonths = this.warrantyMonths;
            let id = this.id
            
            console.log(JSON.stringify(this.data))
            if (this.mode == 'edit') {
                axios.put(`https://localhost:7155/api/Devices/${id}`, this.data).then(response => {
                    console.log(response.data);
                    this.Close();
                    this.refreshedrow();
                    
                })
                    .catch(error => {
                        console.log(error);
                    });
            }
  
            if (this.mode == 'create') {
                axios.post(`https://localhost:7155/api/Devices`, this.data).then(response => {
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
        else{
            console.log("form data is invalid")
        }
        },
  
        Close(){
                this.$refs.form.reset();
                this.dialog = false;
               
        },
  
        deletedata() {
            
           if(this.showDelete == true){
            axios.delete(`https://localhost:7155/api/Devices/${this.id}`).then(response => {
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
            axios.get("https://localhost:7155/api/Devices").
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
  
  
  
  .create-button{
    background-color:#004D40;
  }
  
  .custom-breadcrumbs{
   width: 90%;
   background-color: blue;
  }
  
  
  .ag-root-wrapper {
    padding:3px;
    border: 1px solid #ccc; /* Set the border to the desired style */
    border-radius: 15px; /* Add a rounded border */
  }
  
  .create-button{
    padding-bottom: 2rem;
  }
  
  .grid-container{
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
  
  .warn{
    width:30%;
   display:block;
  }
  
  
  </style>


  <!-- const datetime = new Date(`${this.myDate}T${this.myTime}:00`); -->