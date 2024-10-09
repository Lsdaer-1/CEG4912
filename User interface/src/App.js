import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import Footer from './Footer';
import './i18n';
import PhotoCarousel from './PhotoCarousel';
import { useTranslation } from 'react-i18next';
import WelcomeModal from './WelcomeModal';
import Results from './Results';
import CenteredTextBox from './CenteredTextBox';
import Recommended from './Recommend';
import React, { useState, useEffect } from 'react';
import History from './History';
function App() {
  const { t, i18n } = useTranslation();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  
  const clearSelections = () => {
    setSelectedCategories([]);
  };
  useEffect(() => {
   
    setIsWelcomeOpen(true);
  }, []);
  const closeWelcome = () => setIsWelcomeOpen(false);

  return (
    <>
    <Router>
      <Navbar />
      
      <WelcomeModal isOpen={isWelcomeOpen} onRequestClose={closeWelcome} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/*<PhotoCarousel /> */}
      <CenteredTextBox />
      <Recommended />
      <Home />
      <Routes>  
          <Route path="/history" element={<History />} />
          <Route path="/results" element={<Results />} />
        </Routes> 
        
      <Footer />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Router>
    </>
  );
}

export default App;

function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <section id="home">
      <div className="home">
        <h2>{t('gu1')}</h2>
        <p>{t('gu2')}</p>
      </div>
      </section>
      
    </div>
  );
}
