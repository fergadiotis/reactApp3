import React, { useState, useEffect, useCallback } from 'react';
import './Notification.css';

const Notification = ({ schedules }) => {
    const [notifications, setNotifications] = useState([]);

    const checkSchedules = useCallback(() => {
        const now = new Date();
        const upcomingSchedules = schedules.filter(schedule => {
            const scheduleDateTime = new Date(schedule.date + 'T' + schedule.startTime);
            const timeDiff = scheduleDateTime - now;
            // Notify 15 minutes before schedule
            return timeDiff > 0 && timeDiff <= 900000; // 15 minutes in milliseconds
        });

        if (upcomingSchedules.length > 0) {
            showNotification(upcomingSchedules);
        }
    }, [schedules]);

    useEffect(() => {
        const interval = setInterval(checkSchedules, 60000);
        return () => clearInterval(interval);
    }, [checkSchedules]);

    const showNotification = (upcomingSchedules) => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        upcomingSchedules.forEach(schedule => {
            if (Notification.permission === 'granted') {
                new window.Notification('Upcoming Schedule', {
                    body: `${schedule.title} starts in 15 minutes`,
                    icon: '/favicon.ico'
                });
            }

            setNotifications(prev => [
                ...prev,
                {
                    id: Date.now(),
                    message: `${schedule.title} starts in 15 minutes`,
                    timestamp: new Date()
                }
            ]);
        });
    };

    const removeNotification = (notificationId) => {
        setNotifications(notifications.filter(n => n.id !== notificationId));
    };

    return (
        <div className="notification-container">
            {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                    <span>{notification.message}</span>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="notification-close"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;