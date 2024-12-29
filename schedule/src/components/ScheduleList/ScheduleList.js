import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import './ScheduleList.css';

const ScheduleList = ({ schedules, onDelete, onEdit }) => {
    const getPriorityClass = (priority) => `schedule-card schedule-card-${priority}`;

    const sortedSchedules = [...schedules].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="schedule-list">
            <h2>Scheduled Events</h2>
            {sortedSchedules.map(schedule => (
                <div
                    key={schedule.id}
                    className={getPriorityClass(schedule.priority)}
                >
                    <div className="schedule-header">
                        <div>
                            <h3 className="schedule-title">{schedule.title}</h3>
                            <p className="schedule-date">
                                {formatDate(schedule.date)} |
                                {schedule.startTime} - {schedule.endTime}
                            </p>
                            <p className="schedule-description">{schedule.description}</p>
                        </div>
                        <div className="button-group">
                            <button
                                onClick={() => onEdit(schedule)}
                                className="edit-button"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(schedule.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScheduleList;