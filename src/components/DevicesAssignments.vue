<template>
    
    <v-container >
            <v-breadcrumbs :items="items" style="custom-breadcrumbs">
            </v-breadcrumbs>
    <v-container class=" flex-column justify-center  align-center ">
        <!-- <v-btn @click="Createform" style="font-family:'Times New Roman'; background-color:#004D40; color:white; margin-bottom:1rem;"  >Add New Device</v-btn> -->
        <ag-grid-vue :style="gridStyle" class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
            :gridOptions="gridOptions" :defaultColDef="defaultColDef"  @grid-ready="onGridReady" >
        </ag-grid-vue>
    </v-container>
    </v-container>
  </template>
  
  <script >
  
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
                width: "74%",
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
        {
          text: 'Assignment',
          
          to: '/devices/:id/assignments',
        },
       
      ],
        serialNumber: null,
        opratingSystem: null,
        purchaseDate: null,
        warrantyMonths: null,
            id: null,
            mode: 'create',
            showDelete:null
        };
        
    },
  
    created() {
        let id  = this.$route.params.id;
        axios.get(`https://localhost:7155/api/Devices/${id}/assignments`).
            then((response) => {
                this.rowData = response.data;
                console.log(response.data)
            })
    },
  
    components: {
        AgGridVue,
    },
  
    beforeMount() {
        this.columnDefs = [
          { headerName: 'Employee Name',  field: "empName", sortable: true, filter: true, floatingFilter: true, },
            {
          headerName: 'Assign Date',
          field: 'allotmentDate',
          filter: 'agDateColumnFilter',
          floatingFilter:true,
          sortable: true,
          valueFormatter: (params) => {
            const date = new Date(params.data.allotmentDate);
            return date.toLocaleDateString();
          },
        },
        {
          headerName: 'Return Date',
          field: 'returnDate',
          filter: 'agDateColumnFilter',
          floatingFilter:true,
          sortable: true,
          valueFormatter: (params) => {
            const date = new Date(params.data.returnDate);
            return date.toLocaleDateString();
          },
        },
        { headerName: 'Active', field: "assignmentIsActive", sortable: true, filter: true, floatingFilter: true, 
          valueFormatter: (params) => {
            return params.value ? 'Yes' : 'No';
          },
        },
           
            
        ];
    },
  
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit()
        },
        Createform() {
            this.dialog = true;
            this.mode = 'create';
        },
        refreshedrow() {
            let id  = this.$route.params.id;
            axios.get(`https://localhost:7155/api/Devices/${id}/assignments`).
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