import React, { useState, useEffect } from 'react';
import './ScheduleForm.css';

const CATEGORIES = ['Work', 'Personal', 'Meeting', 'Other'];

const ScheduleForm = ({ onSubmit, editSchedule }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        priority: 'medium',
        category: 'Other',
        tags: []
    });

    const [tagInput, setTagInput] = useState('');

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
            priority: 'medium',
            category: 'Other',
            tags: []
        });
        setTagInput('');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTagAdd = (e) => {
        e.preventDefault();
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-grid">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Start Time:</label>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>End Time:</label>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Priority:</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                    >
                        {CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Tags:</label>
                    <div className="tag-input-container">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="form-input"
                            placeholder="Add a tag"
                        />
                        <button
                            onClick={handleTagAdd}
                            type="button"
                            className="tag-add-button"
                        >
                            Add
                        </button>
                    </div>
                    <div className="tags-display">
                        {formData.tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="tag-remove"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="form-input"
                    />
                </div>
            </div>

            <button type="submit" className="submit-button">
                {editSchedule ? 'Update Schedule' : 'Create Schedule'}
            </button>
        </form>
    );
};

export default ScheduleForm;