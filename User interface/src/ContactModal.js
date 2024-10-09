// src/ContactModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import ScrollableFeed from 'react-scrollable-feed';
import './ContactModal.css';

Modal.setAppElement('#root'); 

function ContactModal({ isOpen, onRequestClose }) {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi!', sender: 'system' }
  ]);

  const handleSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Contact Modal"
      className="contact-modal"
      overlayClassName="contact-overlay"
    >
      <h2>Chat</h2>
      <div>
        <label>
          Select Recipient:
          <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
            <option value="">Choose a recipient</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
            <option value="general">General Inquiry</option>
            {/**<option value="Friends1">Friends1</option>
            <option value="Friends2">Friends2</option>
            <option value="Friends3">Friends3</option> */}
            
          </select>
        </label>
      </div>
      <div className="message-box">
        <ScrollableFeed>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </ScrollableFeed>
      </div>
      <div>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
      </div>
      <button onClick={handleSend}>Send Message</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default ContactModal;

