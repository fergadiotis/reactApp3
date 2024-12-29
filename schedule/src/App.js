import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ScheduleForm from './components/ScheduleForm/ScheduleForm';
import ScheduleList from './components/ScheduleList/ScheduleList';
import './App.css';

const App = () => {
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem('schedules')) || []
  );
  const [editSchedule, setEditSchedule] = useState(null);

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
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
  };

  return (
    <div className="container">
      <Header />
      <ScheduleForm onSubmit={handleSubmit} editSchedule={editSchedule} />
      <ScheduleList
        schedules={schedules}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;