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
    setSearchText(event.target.value);  // 更新用户输入的值
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
          Type to search blogs:
          <input type="text" name="search" className="search-input" value={searchText}   onChange={handleInputChange}   />
          </label>
        <ul className="category-list">
          <li>
            <input
              type="checkbox"
              name="Daily Life"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Daily Life
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Building/Residences"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Building/Residences
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Apartments"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Apartments
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Dormitory"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Dormitory
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Shared"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Shared
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
                Shopping
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Supermarket"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Supermarket
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Shopping Mall"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Shopping Mall
                  </li>
                </ul>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Gastronomy"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Gastronomy
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Restaurant"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Restaurant
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Take Away"
                      onChange={handleCheckboxChange}
                      className="subcategory-checkbox"
                    />
                    Take Away
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <input
              type="checkbox"
              name="Local Cultural Events"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Local Cultural Events
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Festivals"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Festivals
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Concerts"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Concerts
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Cultural Exhibitions"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Cultural Exhibitions
              </li>
            </ul>
          </li>
          <li>
            <input
              type="checkbox"
              name="Social Networking"
              onChange={handleCheckboxChange}
              className="category-checkbox"
            />
            Social Networking
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Meet Offline"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Meet Offline
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Find Friends Online"
                  onChange={handleCheckboxChange}
                  className="subcategory-checkbox"
                />
                Find Friends Online
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
