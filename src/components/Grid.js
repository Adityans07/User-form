import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./grid.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import CustomButtonXomp from './CustomButtonXomp';
// import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function Grid({ gridData, onEdit, onDelete, onNotifyDelete }) {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const ageCalc = (dob) => {
        const dateOfBirth = new Date(dob);
        const today = new Date();
        if(today.getMonth()>=dateOfBirth.getMonth()){
            return today.getFullYear() - dateOfBirth.getFullYear();
        } else {
            return today.getFullYear() - dateOfBirth.getFullYear() - 1;
        }
    }

    const columnDefs = [
        {
            headerName: "Actions",
            pinned: true,
            cellRenderer: (params) => {
                return <CustomButtonXomp rowData={params.data} onEdit={onEdit} onDelete={onDelete} onNotifyDelete={onNotifyDelete}/>;
            }
        },
        { field: "name", headerName: "Name", filter: "agTextColumnFilter" },
        { field: "email", headerName: "Email Address", filter: "agTextColumnFilter" },
        { field: "phone", headerName: "Mobile Number", filter: "agTextColumnFilter" },
        { field: "address", headerName: "Address", filter: "agTextColumnFilter" },
        { field: "gender", headerName: "Gender" },
        { field: "dob", headerName: "Date of birth", filter: "agDateColumnFilter" },
        { field: "ind", headerName: "Indian", filter: "agTextColumnFilter" },
        {
            field: "age",
            headerName: "Age",
            filter: "agNumberColumnFilter",
            valueGetter: (params) => {
                return ageCalc(params.data.dob);
            }
        }
    ];
    const defaultColDefs = useMemo(() => {
        return {
            flex: 1,
            wrapHeaderText: true,
            initialWidth: 200,
            autoHeaderHeight: true,
            suppressSizeToFit: true,
            pagination: true,
            
        }
    }, []);

    return (
        <div className={`grid-container  ag-theme-alpine ${containerStyle}`} >
            <AgGridReact
                // style={{width: "100%", height: "100%"}}
                className='ag-grid'
                rowData={gridData}
                defaultColDef={defaultColDefs}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                paginationPageSize={20}
            />
        </div>
    );
}
