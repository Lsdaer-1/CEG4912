import React from 'react';
import './CenteredTextBox.css';
import { useTranslation } from 'react-i18next';
const CenteredTextBox = () => {
  const { t } = useTranslation();
  return (
    <div className="centered-container">
      <div className="centered-text-box">
        <h2>{t('welcome')}</h2>
        <p>
        {t('welcome2')}
        </p>
      </div>
    </div>
  );
};

export default CenteredTextBox;
