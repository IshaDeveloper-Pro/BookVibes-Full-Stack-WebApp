import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booklist from './Components/Booklist';
import BookDetails from './Components/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Booklist />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


