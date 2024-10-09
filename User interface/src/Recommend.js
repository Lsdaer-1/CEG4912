import React, { useState } from 'react';
import Modal from 'react-modal';
import './Recommended.css';
import { useTranslation } from 'react-i18next';
import photo1 from './Photo/bookphoto1.jpg';
import photo2 from './Photo/bookphoto2.jpg';
import photo3 from './Photo/bookphoto3.jpg';
import photo4 from './Photo/bookphoto4.jpg';
import photo5 from './Photo/bookphoto5.jpg';
import photo6 from './Photo/bookphoto6.jpg';

const RecommendData = [
  {
    image: photo1,
    text: 'Bigger Leaner Stronger:',
    description: 'But is it an exercise book (and nutrition book) that’ll show you exactly how to eat and exercise to gain 25-to-35 pounds of lean muscle and lose just as much fat (or even more)? Yes. And faster than you probably think possible.',
  },
  {
    image: photo2,
    text: 'Sweet Blood of Mine: Book One of the Overworld Chronicles',
    description: "FROM ZERO TO HERO?Justin has ninety-nine problems, but a vampire ain't one.When Justin discovers he has super powers, life gets a lot more interesting. But as he learns the ropes of his new supernatural life, he soon realizes he's not alone.His parents are hiding dangerous secrets from him.",
  },
  {
    image: photo3,
    text: 'The Client Retention Handbook for Digital Marketing Agencies: How to Keep Clients on Board Long-Term and Reduce Churn',
    description: 'If you’re reading this now - chances are you’re frustrated because you haven’t quite figured out HOW to do that, building your team, and enjoying the sort of lifestyle most people only dream of.',
  },
  {
    image: photo4,
    text: 'The Lighthouse (Five Island Cove Book 1)',
    description: "After the death of a childhood loved one, 5 best friends reunite in the small coastal town of Five Island Cove. One doesn't expect to find love with a high school crush. Another isn't prepared to find the strength she needs to take control of her life. And none of them are ready for the secrets they'll uncover at the lighthouse...",
  },
  {
    image: photo5,
    text: "American Dirt (Oprah's Book Club): A Novel",
    description: 'Lydia lives in Acapulco. She has a son, Luca, the love of her life, and a wonderful husband who is a journalist. And while cracks are beginning to show in Acapulco because of the cartels, Lydia’s life is, by and large, fairly comfortable. But after her husband’s tell-all profile of the newest drug lord is published, none of their lives will ever be the same.',
  },
  {
    image: photo6,
    text: 'The Book of Elsewhere: A Novel',
    description: 'An “action-packed [and] profoundly stylish” (Los Angeles Times) epic from Keanu Reeves and China Miéville, unlike anything these two genre-bending pioneers have created before, inspired by the world of the BRZRKR comic books',
  },
];

const Recommended = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); 

  const openModal = (book) => {
    setSelectedBook(book); 
    setModalIsOpen(true);  
  };

  const closeModal = () => {
    setModalIsOpen(false); 
    setSelectedBook(null); 
  };

  const handleBorrow = () => {
    alert(`The robot has picked up the book, please go to the area where the bookshelf is located. Book Name: ${selectedBook.text}`);
    closeModal();
  };

  return (
    <div className="activities-container">
      <div className="activities-container2">
        <h2>{t('act')}</h2>
        <p>{t('act2')}</p>
      </div>
      <br />
      <div className="activities-grid">
        {RecommendData.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-left">
              <img src={activity.image} alt={`Activity ${index + 1}`} className="activity-image" />
            </div>
            <div className="activity-right">
              <h3>{activity.text}</h3>
              <p>{activity.description}</p>
              <button onClick={() => openModal(activity)}>{t('act3')}</button> 
            </div>
          </div>
        ))}
      </div>

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Book Details"
        className="modal2-content"
        overlayClassName="modal-overlay"
      >
        {selectedBook && (
          <div>
            <h2>{selectedBook.text}</h2>
            <img src={selectedBook.image} alt={selectedBook.text} className="modal-image" />
            <p>{selectedBook.description}</p>
            <button onClick={handleBorrow}>Pick up this book</button>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Recommended;

