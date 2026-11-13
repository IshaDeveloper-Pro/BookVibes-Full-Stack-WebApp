import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../BookDetails.css';

function BookDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch(`https://localhost:7282/api/books/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Book not found");
        return res.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Loading book details...</p>;
  if (!book) return <p className="loading-text">Book not found!</p>;

  return (
    <div className="book-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Gallery</button>
      
      <div className="book-details-card">
        <div className="details-image-container">
          <img 
            src={book.coverImageUrl || "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"} 
            alt={book.title} 
            className="details-image" 
          />
          <span className="details-rating">★ {book.rating || '4.5'}</span>
        </div>

        <div className="details-info">
          <h1 className="details-title">{book.title}</h1>
          <p className="details-author">By <span>{book.author}</span></p>
          
          <div className="meta-tags">
            <span className="tag">Genre: {book.Genre || book.genre || 'General'}</span>
            <span className="tag">Published: {book.publishedYear}</span>
          </div>

          <h3>Description</h3>
          <p className="details-desc">{book.description || 'No description available for this book.'}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;