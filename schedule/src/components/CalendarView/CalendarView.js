import React, { useState } from 'react';
import './CalendarView.css';

const CalendarView = ({ schedules, onEdit, onDelete }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    // Get current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get first day of month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Generate calendar days
    const getDaysArray = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    // Get schedules for a specific date
    const getSchedulesForDate = (day) => {
        if (!day) return [];
        const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
        return schedules.filter(schedule => schedule.date === dateStr);
    };

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
    };

    const handleCloseDetails = () => {
        setSelectedSchedule(null);
    };

    // Navigation handlers
    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1));
    };

    // Render schedule details popup
    const renderScheduleDetails = () => {
        if (!selectedSchedule) return null;

        return (
            <div className="schedule-details-overlay" onClick={handleCloseDetails}>
                <div className="schedule-details-modal" onClick={e => e.stopPropagation()}>
                    <div className="schedule-details-header">
                        <h3>{selectedSchedule.title}</h3>
                        <button onClick={handleCloseDetails} className="close-button">×</button>
                    </div>
                    <div className="schedule-details-content">
                        <div className="details-row">
                            <span className="label">Date:</span>
                            <span>{new Date(selectedSchedule.date).toLocaleDateString()}</span>
                        </div>
                        <div className="details-row">
                            <span className="label">Time:</span>
                            <span>{selectedSchedule.startTime} - {selectedSchedule.endTime}</span>
                        </div>
                        <div className="details-row">
                            <span className="label">Priority:</span>
                            <span className={`priority-badge ${selectedSchedule.priority}`}>
                                {selectedSchedule.priority.charAt(0).toUpperCase() + selectedSchedule.priority.slice(1)}
                            </span>
                        </div>
                        {selectedSchedule.category && (
                            <div className="details-row">
                                <span className="label">Category:</span>
                                <span>{selectedSchedule.category}</span>
                            </div>
                        )}
                        <div className="details-description">
                            <span className="label">Description:</span>
                            <p>{selectedSchedule.description || 'No description provided.'}</p>
                        </div>
                        <div className="details-actions">
                            <button
                                onClick={() => onEdit(selectedSchedule)}
                                className="edit-button"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(selectedSchedule);
                                    handleCloseDetails();
                                }}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={prevMonth} className="nav-button">&lt;</button>
                <h2>{new Date(currentYear, currentMonth).toLocaleDateString('default', {
                    month: 'long',
                    year: 'numeric'
                })}</h2>
                <button onClick={nextMonth} className="nav-button">&gt;</button>
            </div>

            <div className="calendar-grid">
                <div className="weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <div className="days">
                    {getDaysArray().map((day, index) => (
                        <div key={index} className={`day-cell ${day ? '' : 'empty'}`}>
                            {day && (
                                <>
                                    <span className="day-number">{day}</span>
                                    <div className="schedule-list">
                                        {getSchedulesForDate(day).map((schedule) => (
                                            <div
                                                key={schedule.id}
                                                className={`schedule-item priority-${schedule.priority}`}
                                                onClick={() => handleScheduleClick(schedule)}
                                            >
                                                <div className="schedule-content">
                                                    <div className="schedule-time">{schedule.startTime}</div>
                                                    <div className="schedule-title">{schedule.title}</div>
                                                    <div className="schedule-preview">
                                                        Click to view details
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {renderScheduleDetails()}
        </div>
    );
};

export default CalendarView;