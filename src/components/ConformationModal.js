import React from 'react';
import "./conformation.css";
import ReactModal from 'react-modal';

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
    return (
        <ReactModal
        isOpen={isOpen}
        className={"confirmation-modal"}
        overlayClassName={"overlay-confirm-background"}
        >
            <div className='button-modal'>
                <h1>Are you sure?</h1>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>

        </ReactModal>
    );
}