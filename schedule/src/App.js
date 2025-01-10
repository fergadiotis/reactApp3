import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ScheduleForm from './components/ScheduleForm/ScheduleForm';
import CalendarView from './components/CalendarView/CalendarView';
import './App.css';

const App = () => {
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem('schedules')) || []
  );
  const [editSchedule, setEditSchedule] = useState(null);
  const [view, setView] = useState('form'); // 'form' or 'calendar'

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
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
    // Switch to calendar view after submission
    setView('calendar');
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
    setView('form');
  };

  return (
    <div className="container">
      <Header />
      <div className="view-toggle">
        <button
          className={view === 'form' ? 'active' : ''}
          onClick={() => setView('form')}
        >
          Add Schedule
        </button>
        <button
          className={view === 'calendar' ? 'active' : ''}
          onClick={() => setView('calendar')}
        >
          Calendar View
        </button>
      </div>

      {view === 'form' ? (
        <ScheduleForm onSubmit={handleSubmit} editSchedule={editSchedule} />
      ) : (
        <CalendarView
          schedules={schedules}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;