import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getbook } from '../JS/bookSlice';
import './BookInterface.css';

const BookInterface = () => {
  const dispatch = useDispatch();
  const { booklist, status } = useSelector(state => state.book);

  // Filtres
  const [filters, setFilters] = useState({
    categories: [],
    maxPrice: 100,
  });

  // Recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Liste des catégories
  const categories = ["Romance", "History", "Science", "Technology", "Comedy", "Horror"];

  useEffect(() => {
    dispatch(getbook());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "category") {
      if (checked) setFilters({ ...filters, categories: [...filters.categories, value] });
      else setFilters({ ...filters, categories: filters.categories.filter(cat => cat !== value) });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const filteredBooks = booklist
    ? booklist.filter(book => 
        (filters.categories.length === 0 || filters.categories.includes(book.category)) &&
        book.price <= filters.maxPrice &&
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (status === 'pending') return <div>Loading...</div>;

  return (
    <div className="container">
      {/* Filter Section */}
       <h2 className="filter-title" style={{position:"relative", left:"6%"}}>Filters</h2>
      <div className="filter-section">
       

        <div className="filter-card">
          <div className="filter-card-header">Price Range</div>
          <div className="filter-card-body">
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="100"
              step="0.01"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="price-slider"
              style={{
                background: `linear-gradient(to right, #1E90FF 0%, #1E90FF ${filters.maxPrice}%, #ddd ${filters.maxPrice}%, #ddd 100%)`
              }}
            />
            <div className="price-values">
              <span>0</span>
              <span>{filters.maxPrice}</span>
            </div>
          </div>
        </div>

        <div className="filter-card">
          <div className="filter-card-header">Categories</div>
          <div className="filter-card-body">
            <div className="category-grid">
              {categories.map((cat) => (
                <label className="category-list" key={cat}>
                  <input
                    type="checkbox"
                    name="category"
                    value={cat}
                    checked={filters.categories.includes(cat)}
                    onChange={handleFilterChange}
                  />
                  <span className="category-label">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="book-section">
        <div className="books-header">
          <h2>Books</h2>
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="book-grid grid grid-cols-3">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">${book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookInterface;
