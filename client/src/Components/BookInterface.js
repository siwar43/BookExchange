import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getbook } from '../JS/bookSlice';
import ReactStars from "react-rating-stars-component";
import { TiChevronRight } from "react-icons/ti";
import './BookInterface.css';

const BookInterface = () => {
  const dispatch = useDispatch();
  const { booklist, status } = useSelector(state => state.book);

  // Filtres
  const [filters, setFilters] = useState({
      categories: [],
      maxPrice: 100,
    });

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Categories list
  const categories = ["History", "Horror", "Technology", "Comedy", "Romance", "Science"];

  useEffect(() => {
    dispatch(getbook());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "category") {
      if (checked) setFilters({ ...filters, categories: [...filters.categories, value] });
      else setFilters({ ...filters, categories: filters.categories.filter(cat => cat !== value) });
    } else {
      // Convertir en nombre si c’est maxPrice
      setFilters({ ...filters, [name]: name === "maxPrice" ? parseFloat(value) : value });
    }
  };

  // Book filter
  const filteredBooks = booklist
    ? booklist.filter(book => 
        (filters.categories.length === 0 || filters.categories.includes(book.category)) &&
        book.price <= filters.maxPrice &&
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  if (status === 'pending') return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="titles">
        <h2 className="filter-title">Filter Option</h2>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-card">
          <div className="filter-card-header">Price</div>
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
              <span>{filters.maxPrice.toFixed(2)}</span>
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
                  <span className="checkmark"></span>
                  {cat}
                </label>
              ))}
            </div>
          </div>
</div>
      </div>

      {/* Cards Section */}
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
          {currentBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h3 className="book-title">{book.title}</h3>
            <p className="category">{book.category}</p>
            <div className="stars">
              <ReactStars count={5} value={book.rate} size={24} edit={false}   activeColor="#D4AF37" />
            </div>
            <div className="hover-info">
              <p className="price">{book.price.toFixed(2)} dt</p>
              <button className="more-btn">
                Explore <TiChevronRight />
              </button>
            </div>
          </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default BookInterface;