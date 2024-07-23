import React, { useState } from "react";
import dlt1 from "../assets/delete.png";
import edit1 from "../assets/edit.png";
import ConfirmationModal from "./ConformationModal";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CustomButtonXomp = ({ rowData, onEdit, onDelete, onNotifyDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleEditClick = (e) => {
        // Pass the rowData to the parent component for edit operation
        onEdit(rowData.id);
    };

    const handleDeleteClick = (e) => {
        // Pass the rowData to the parent component for delete operation 
        setShowConfirm(true);
    };
    const onConfirm = () => {
        onDelete(rowData.id);
        setShowConfirm(false);
        onNotifyDelete();

    }
    
    const onClose = () => {
        setShowConfirm(false);
    }

    return (
        <div style={{marginTop: "0.4rem"}}>
            <Link to={`/edit/${rowData.email}`} style={{ textDecoration: "none" }}>
                <button style={{background: "rgba(0,0,0,0)", border: "none"}} onClick={handleEditClick}>
                    <img src={edit1} style={{ height: "1.2rem", width: "1.5rem", marginRight: "2rem", cursor: "pointer" }} alt="Edit" />
                </button>
            </Link>
            <button style={{background: "rgba(0,0,0,0)", border: "none"}} onClick={handleDeleteClick}>
                <img src={dlt1} style={{height: "1.2rem", width: "1.5rem", cursor: "pointer"}} alt="Delete" />
            </button>
            {
                (setShowConfirm) && <ConfirmationModal isOpen={showConfirm} onConfirm={onConfirm} onClose={onClose}/>
            }
        </div>
    );
};

export default CustomButtonXomp;
