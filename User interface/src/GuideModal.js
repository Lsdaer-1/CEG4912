// src/GuideModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './GuideModal.css';

Modal.setAppElement('#root');

function GuideModal({ isOpen, onRequestClose }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== name));
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedCategories([]);
      setSearchText('');
    }
  }, [isOpen]);

  const handleSearch = () => {
    console.log("Selected categories: ", selectedCategories);
    console.log("Search text: ", searchText); 
    navigate('/results', { state: { selectedCategories, searchText } });
    onRequestClose();
  };
  const handleInputChange = (event) => {
    setSearchText(event.target.value);  
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Guide Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-body">
        <h2>Category Search</h2>
        <label>
          Type to search books:
          <input type="text" name="search" className="search-input" value={searchText}   onChange={handleInputChange}   />
          </label>
        <ul className="category-list">
          <li>
            <input
              type="checkbox"
              name="Literature & Fiction"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Literature & Fiction
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Classic Literature"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Classic Literature
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="British Literature"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    British Literature
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="American Literature"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    American Literature
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Russian Literature"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Russian Literature
                  </li>
                </ul>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Shopping"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Science Fiction
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Dystopian Fiction"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Dystopian Fiction
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Space Opera"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Space Opera
                  </li>
                </ul>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Fantasy"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Fantasy
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Urban Fantasy"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Urban Fantasy
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Epic Fantasy"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Epic Fantasy
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <input
              type="checkbox"
              name="Children's Books"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Children's Books
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Fairy Tales"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Fairy Tales
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Educational Books"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Educational Books
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Adventure Stories"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Adventure Stories
              </li>
            </ul>
          </li>
          <li>
            <input
              type="checkbox"
              name="Academic & Educational"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Academic & Educational
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Mathematics"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Mathematics
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Computer Science"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Computer Science
              </li>
            </ul>
          </li>
      
          <li>
            <input
              type="checkbox"
              name="Language"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Language
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Japanese"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Japanese
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Chinese"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Chinese
              </li>
              <li>
                <input
                  type="checkbox"
                  name="French"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                French
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Spanish"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Spanish
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Portuguese"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Portuguese
              </li>
           
          
         
            </ul>
          </li>
        </ul>
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </Modal>
  );
}

export default GuideModal;
