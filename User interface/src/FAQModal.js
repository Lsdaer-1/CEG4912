import React from 'react';
import Modal from 'react-modal';
import './FAQModal.css';

Modal.setAppElement('#root');

const FAQModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="FAQ Modal"
    className="ReactModal2__Content"
    overlayClassName="ReactModal2__Overlay"
  >
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-content">
        <div>
          <h3>How do I register and log in?</h3>
          <p>To register, click on the 'Sign In' button on the homepage and fill in the required information. To log in, click on the 'Sign In' button and enter your credentials.</p>
        </div>
        <div>
          <h3>How do I recover my password?</h3>
          <p>Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password.</p>
        </div>
        <div>
          <h3>How do i borrow books?</h3>
          <p>To borrow books, visit our library in person or log in to our online catalog, select the books you want, and click on the "Borrow" button. You may need your library card or account details to complete the process.</p>
        </div>
        <div>
          <h3>How many books can i borrow at once?</h3>
          <p>You can borrow up to 3 books at a time. This limit may vary depending on your membership level or the specific library’s policy.</p>
        </div>
        <div>
          <h3>What is borrowing period?          </h3>
          <p>The standard borrowing period is 4 weeks. You can check the due date on your borrowing receipt or in your online account.</p>
        </div>
        <div>
          <h3>Can I extend the borrowing period?</h3>
          <p>Yes, you can renew your borrowed books if no one else has reserved them. Renewals can usually be done online, by phone, or in person, up to 3 times.</p>
        </div>
        <div>
          <h3>What happens if I return a book late?</h3>
          <p>If you return books after the due date, a late fee of [amount] per day may apply. Please check our late fee policy for details.</p>
        </div>
        <div>
          <h3>How do I return a borrowed book?</h3>
          <p>You can return books to the library at the front desk or drop them in the book return box. If you borrowed online, return instructions will be provided with your order, you can return the books online.</p>
        </div>
        
      </div>
      <button onClick={onRequestClose}>Close</button>
    </div>
  </Modal>
);

export default FAQModal;

