import React, { useState } from 'react';
import './CalendarView.css';

const CalendarView = ({ schedules }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

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

    // Format month name
    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

    // Navigation handlers
    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1));
    };

    const showScheduleDetails = (day) => {
        setSelectedDate(day);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h2>{monthName} {currentYear}</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>

            <div className="calendar-grid">
                <div className="weekdays">
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </div>

                <div className="days">
                    {getDaysArray().map((day, index) => (
                        <div
                            key={index}
                            className={`day-cell ${day ? '' : 'empty'}`}
                            onClick={() => day && showScheduleDetails(day)}
                        >
                            {day && (
                                <>
                                    <span className="day-number">{day}</span>
                                    <div className="schedule-indicators">
                                        {getSchedulesForDate(day).map((schedule, idx) => (
                                            <div
                                                key={idx}
                                                className={`schedule-indicator priority-${schedule.priority}`}
                                            >
                                                {schedule.startTime} - {schedule.title}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedDate && (
                <div className="schedule-popup">
                    <div className="popup-header">
                        <h3>{monthName} {selectedDate}</h3>
                        <button onClick={() => setSelectedDate(null)}>×</button>
                    </div>
                    <div className="popup-content">
                        {getSchedulesForDate(selectedDate).map((schedule, idx) => (
                            <div key={idx} className={`schedule-item priority-${schedule.priority}`}>
                                <div className="schedule-time">{schedule.startTime}</div>
                                <div className="schedule-title">{schedule.title}</div>
                                <div className="schedule-description">{schedule.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;