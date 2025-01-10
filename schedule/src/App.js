import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ScheduleForm from './components/ScheduleForm/ScheduleForm';
import CalendarView from './components/CalendarView/CalendarView';
import FilterBar from './components/FilterBar/FilterBar';
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation';
import './App.css';

const App = () => {
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem('schedules')) || []
  );
  const [filteredSchedules, setFilteredSchedules] = useState(schedules);
  const [editSchedule, setEditSchedule] = useState(null);
  const [view, setView] = useState('calendar');
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    setFilteredSchedules(schedules);
  }, [schedules]);

  const handleSubmit = (schedule) => {
    if (editSchedule) {
      setSchedules(schedules.map(s =>
        s.id === editSchedule.id ? { ...schedule, id: s.id } : s
      ));
      setEditSchedule(null);
    } else {
      setSchedules([...schedules, { ...schedule, id: Date.now() }]);
    }
    setView('calendar');
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
    setView('form');
  };

  const handleDeleteClick = (schedule) => {
    setScheduleToDelete(schedule);
  };

  const handleDeleteConfirm = () => {
    if (scheduleToDelete) {
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleToDelete.id));
      setScheduleToDelete(null);
    }
  };

  const handleFilter = (filters) => {
    let filtered = [...schedules];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(schedule =>
        schedule.title.toLowerCase().includes(searchLower) ||
        schedule.description.toLowerCase().includes(searchLower)
      );
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(schedule =>
        schedule.priority === filters.priority
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(schedule =>
        schedule.category === filters.category
      );
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate >= startDate && scheduleDate <= endDate;
      });
    }

    setFilteredSchedules(filtered);
  };

  return (
    <div className="container">
      <Header />
      <div className="view-toggle">
        <button
          className={view === 'form' ? 'active' : ''}
          onClick={() => setView('form')}
        >
          {editSchedule ? 'Edit Schedule' : 'Add Schedule'}
        </button>
        <button
          className={view === 'calendar' ? 'active' : ''}
          onClick={() => setView('calendar')}
        >
          Calendar View
        </button>
      </div>

      {view === 'calendar' && (
        <FilterBar onFilterChange={handleFilter} />
      )}

      {view === 'form' ? (
        <ScheduleForm
          onSubmit={handleSubmit}
          editSchedule={editSchedule}
        />
      ) : (
        <CalendarView
          schedules={filteredSchedules}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {scheduleToDelete && (
        <DeleteConfirmation
          schedule={scheduleToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setScheduleToDelete(null)}
        />
      )}
    </div>
  );
};

export default App;