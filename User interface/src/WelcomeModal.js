// src/WelcomeModal.js
import React from 'react';
import Modal from 'react-modal';
import './WelcomeModal.css';

Modal.setAppElement('#root');

const WelcomeModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Welcome Modal"
    className="ReactModal3__Content"
    overlayClassName="ReactModal3__Overlay"
  >
    <div>
      <h2>Welcome to the Intelligent Book Management System
      </h2>
      <p>We are happy to have you here. This site is designed to help all users to control the machine pickup device to pick up and return books and to recommend individual types of books. You are welcome to browse the different sections and join our community to develop the site together!</p>
      <button onClick={onRequestClose}>Close</button>
    </div>
  </Modal>
);

export default WelcomeModal;
