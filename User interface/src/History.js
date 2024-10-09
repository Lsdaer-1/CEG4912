import React from 'react';
import './History.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function History({ isOpen, onRequestClose }) {
    
    const borrowHistory = [
        { title: 'The Great Gatsby', borrowDate: '2024-01-12', returnDate: '2024-02-01' },
        { title: '1984', borrowDate: '2024-01-20', returnDate: '2024-12-15' }, 
        { title: 'To Kill a Mockingbird', borrowDate: '2024-02-01', returnDate: '2024-12-10' },  
      ];
    
      const today = new Date(); 
    

      const handleReturn = (bookTitle) => {
        alert(`Please return books to shelf #one within three minutes. Book Name: ${bookTitle}`);
      };
    
      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="History Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="history-container">
            <h2>Your Borrowing History</h2>
            <ul>
              {borrowHistory.map((record, index) => {
                const returnDate = new Date(record.returnDate);
                const isFutureReturn = returnDate > today; 
                const isReturned = returnDate <= today;
                return (
                  <li key={index} className="history-item">
                    <p><strong>Book:</strong> {record.title}</p>
                    <p><strong>Borrowed On:</strong> {record.borrowDate}</p>
                    <p><strong>Return Date:</strong> {record.returnDate}</p>
                    {isReturned && (
                  <span className="returned-badge">returned</span>
                   )}
                    {isFutureReturn && (
                      <button onClick={() => handleReturn(record.title)} className="return-button">
                        return
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            <button onClick={onRequestClose} className="close-button">Close</button>
          </div>
        </Modal>
      );
    }
  
  export default History;