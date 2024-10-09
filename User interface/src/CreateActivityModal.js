import React, { useState } from 'react';
import Modal from 'react-modal';
import './CreateActivityModal.css';

Modal.setAppElement('#root');

function CreateActivityModal({ isOpen, onRequestClose }) {
  const [activity, setActivity] = useState({
    name: '',
    date: '',
    time: '',
    place: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Activity Created:', activity);
    onRequestClose();
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(activity).length;
    const filledFields = Object.values(activity).filter(value => value).length;
    return (filledFields / totalFields) * 100;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Activity Modal"
      className="create-activity-modal"
      overlayClassName="create-activity-overlay"
    >
      <h2>Create Activity</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${calculateProgress()}%` }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input type="text" name="name" value={activity.name} onChange={handleChange} required />
        </label>
        <label>
        Expected date of return:
          <input type="date" name="date" value={activity.date} onChange={handleChange} required />
        </label>
        <label>
        Expected time of return:
          <input type="time" name="time" value={activity.time} onChange={handleChange} required />
        </label>
        <label>
          Place:
          <input type="text" name="place" value={activity.place} onChange={handleChange} required />
        </label>
        <button type="submit">Create</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
}

export default CreateActivityModal;
