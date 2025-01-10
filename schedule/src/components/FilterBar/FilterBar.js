import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        search: '',
        priority: 'all',
        category: 'all',
        dateRange: {
            start: '',
            end: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = {
            ...filters,
            [name]: value
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleDateChange = (type, value) => {
        const newFilters = {
            ...filters,
            dateRange: {
                ...filters.dateRange,
                [type]: value
            }
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="filter-bar">
            <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search schedules..."
                className="filter-input"
            />

            <select
                name="priority"
                value={filters.priority}
                onChange={handleChange}
                className="filter-select"
            >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
            </select>

            <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="filter-select"
            >
                <option value="all">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Appointment">Appointment</option>
                <option value="Other">Other</option>
            </select>

            <div className="date-range">
                <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    className="filter-input"
                />
                <span>to</span>
                <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    className="filter-input"
                />
            </div>
        </div>
    );
};

export default FilterBar;