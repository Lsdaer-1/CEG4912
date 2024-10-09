import React, { useState } from 'react';
import Modal from 'react-modal';
import './SignInModal.css';

Modal.setAppElement('#root'); // 确保在应用根元素中正确挂载弹窗

const SignInModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError('Veuillez entrer une adresse e-mail valide (ex : utilisateur@example.com)');
    } else {
      setEmailError('');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Sign In Modal">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <form>
          <div className="form-group">
            <label>
              Email:
              <input 
                type="text" 
                name="email" 
                value={email} 
                onChange={validateEmail} 
              />
            </label>
            {emailError && <span className="error-message">{emailError}</span>}
          </div>
          <div className="form-group">
            <label>
              Password:
              <input type="password" name="password" />
            </label>
          </div>
          <a href="#" className="forgot-password">Forget password</a>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
        <a href="#" className="create-account">Click here if you don’t have an account</a>
      </div>
    </Modal>
  );
}

export default SignInModal;


