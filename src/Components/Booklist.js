import React, { useState, useEffect } from 'react';
import './Booklist.css';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Input box ke liye
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Backend  data fetch 
 const fetchBooks = async () => {
  setLoading(true);
  try {
   
    const response = await fetch(`https://localhost:7282/api/books?search=${searchTerm}&page=${page}&pageSize=8`);
    const data = await response.json();
    
    setBooks(data.books);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, page]);

  
  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(1); 
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header-container">
        <h1 className="main-title">BookVibes Gallery</h1>
        <p className="sub-title">Explore More books.. </p>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearchClick} className="search-box">
        <input 
          type="text" 
          placeholder="Search by title or author..." 
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* Loading State */}
      {loading ? (
        <p className="no-results">Loading books from database...</p>
      ) : (
        /* Books Grid */
        <div className="books-grid">
          {books.length > 0 ? (
            books.map(book => (
              <div key={book.id} className="book-card">
                <div className="image-container">
                  <img src={book.coverImageUrl} alt={book.title} className="book-image" />
                  <span className="rating-badge">★ {book.rating || '4.5'}</span>
                </div>
                <div className="card-content">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">By {book.author}</p>
                  <div className="card-footer">
                    <span className="book-price">{book.publishedYear}</span>
                    <button 
  className="view-btn" 
  onClick={() => navigate(`/book/${book.id}`)} 
>
  View Details
</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No books found in the database.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
        <button 
          className="search-btn"
          disabled={page === 1} 
          onClick={() => setPage(prev => prev - 1)}
        >
          Previous
        </button>
        
        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
          Page {page} of {totalPages || 1}
        </span>

        <button 
          className="search-btn"
          disabled={page >= totalPages} 
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;