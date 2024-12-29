import React, { useState, useEffect } from 'react';
import './ScheduleForm.css';

const ScheduleForm = ({ onSubmit, editSchedule }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        priority: 'medium'
    });

    useEffect(() => {
        if (editSchedule) {
            setFormData(editSchedule);
        }
    }, [editSchedule]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: '',
            date: '',
            startTime: '',
            endTime: '',
            description: '',
            priority: 'medium'
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-grid">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Schedule Title"
                    className="form-input"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="form-input"
                    rows="3"
                />
            </div>
            <button type="submit" className="form-button">
                {editSchedule ? 'Update Schedule' : 'Add Schedule'}
            </button>
        </form>
    );
};

export default ScheduleForm;