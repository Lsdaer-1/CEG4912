import React from 'react';
import { useLocation } from 'react-router-dom';
import './Results.css';

function Results() {
  const location = useLocation();
  const { selectedCategories,searchText } = location.state || {};
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel set in the Jazz Age that tells the story of Jay Gatsby's unrequited love for Daisy Buchanan.",
      publishDate: "1925",
      coverImage: ""
    },
    {
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel set in a totalitarian society controlled by the Party and its leader, Big Brother.",
      publishDate: "1949",
      coverImage: ""
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A novel about the serious issues of rape and racial inequality in the 1930s Deep South.",
      publishDate: "1960",
      coverImage: ""
    }
  ];
  const handleButtonClick = (bookTitle) => {
    alert(`The robot has picked up the book, please go to the area where the bookshelf is located. Book Name: ${bookTitle}`);
  };
  return (
    <div className="results-container">
      <h2>Search Results</h2>
      {searchText && (
        <div className="search-text">
          <p><strong>Search Term:</strong> {searchText}</p>
        </div>
      )}
      <div className="selected-categories">
        {selectedCategories && selectedCategories.length > 0 ? (
          selectedCategories.map((category, index) => (
            <span key={index} className="category-item">{category}</span>
          ))
        ) : (
          <p>Please select the category from the book search  on the navigation bar.</p>
        )}
      </div>
      
      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <img src={book.coverImage} alt={`${book.title} cover`} className="book-cover" />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Published:</strong> {book.publishDate}</p>
              <p>{book.description}</p>
              <button className="pickup-button" onClick={() => handleButtonClick(book.title)}>
                pick up the book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
