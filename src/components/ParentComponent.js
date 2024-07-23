import React, { useState, useEffect } from 'react';
import EditForm from './EditForm';
import Form from './Form';
import Grid from './Grid';
import { ToastContainer, toast } from 'react-toastify';

export default function ParentComponent() {
    const [gridData, setGridData] = useState(JSON.parse(localStorage.getItem("user-form")) || []);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editRowData, setEditRowData] = useState(null);

    function handleFormSubmit(newFormData) {
        setGridData([...gridData, newFormData]);
    }

    function handleEditFormSubmit(updatedFormData) {
      const updatedGridData = gridData.map(row => {
        if (row.id === updatedFormData.id) {
            return updatedFormData; // Update the row with matching ID
        }
        return row;
        });
        setGridData(updatedGridData);
        setEditModalOpen(false);
        setEditRowData(null);
    }

    function handleEdit(id) {
        const rowData = gridData.find(row => row.id === id);
        setEditRowData(rowData);
        setEditModalOpen(true);
    }

    function handleDelete(id) {
        if(localStorage.getItem(id)){
            localStorage.removeItem(id);
        }
        const updatedGridData = gridData.filter((row) =>
            row.id !== id,
        );
        setGridData(updatedGridData);
    }
    const notifySuccessUpdate = () => {
        toast.success("Data successfully updated", {
            theme: "colored",
            position: "top-right"
        });
    }
    const notifySuccess = () => {
        toast.success("Data successfully added", {
            theme: "colored",
            position: "top-right"
        });
    }
    const notifyError = () => {
        toast.error("Please enter valid data", {
            position: "top-right"
        });
    };

    const notifyDelete = () => {
        toast.success("Item deleted successfully", {
            theme: "colored",
            position: "top-right"
        })
    }


    const closeModal = () => {
        console.log("Close modal called");
        setEditModalOpen(false);
        setEditRowData(null);
    };
    useEffect(() => {
        localStorage.setItem("user-form", JSON.stringify(gridData));
    }, [gridData])
    

    return (
        <div>
            <Form onFormSubmit={handleFormSubmit} data={gridData} onError={notifyError} onSuccess={notifySuccess}/>
            <Grid gridData={gridData} onEdit={handleEdit} onDelete={handleDelete} onNotifyDelete={notifyDelete}/>
            {editModalOpen && (
                <EditForm
                isOpen={editModalOpen}
                rowData={editRowData}
                onFormSubmit={handleEditFormSubmit}
                closeModal={closeModal}
                onSuccess={notifySuccessUpdate}
                onError={notifyError}
            />
            )}
            <ToastContainer />
        </div>
    );
}
