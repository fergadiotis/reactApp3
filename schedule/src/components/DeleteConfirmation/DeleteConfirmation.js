import React from 'react';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ schedule, onConfirm, onCancel }) => {
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <h2>Delete Schedule</h2>
                <p>Are you sure you want to delete "{schedule.title}"?</p>
                <p className="schedule-info">
                    Date: {new Date(schedule.date).toLocaleDateString()}<br />
                    Time: {schedule.startTime} - {schedule.endTime}
                </p>
                <div className="delete-modal-buttons">
                    <button
                        onClick={onCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(schedule.id)}
                        className="confirm-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;