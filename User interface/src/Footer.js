import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import ContactModal from './ContactModal';
import './Footer.css';

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {t('f4')}</p>
        <ul className="footer-links">
          <li><a href="#">{t('f1')}</a></li>
          <li><a href="#">Tel : 1234565678</a></li>
          <li><a href="#">{t('f2')}</a></li>
          <li><a href="#contact" onClick={openModal}>{t('f3')}</a></li>
        </ul>
      </div>
      <ContactModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </footer>
  );
}

export default Footer;
