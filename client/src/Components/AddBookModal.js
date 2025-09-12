import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addbook } from '../JS/bookSlice';
import './AddBookModal.css';

const AddBookModal = ({ isOpen, onClose, ping, setping }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const [formData, setFormData] = useState({
    title: '',
    Owner: '',
    author: '',
    editor: '',
    description: '',
    category: '',
    price: '',
    image: '',
    language: '',
    rate: '',
  });

  // Ensure Owner is always set to current user
  useEffect(() => {
    if (user?.username) {
      setFormData((prev) => ({ ...prev, Owner: user.username }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addbook(formData)).unwrap();
      alert('Book added successfully!');
      // Reset form but keep Owner
      setFormData({
        title: '',
        Owner: user?.username || '',
        author: '',
        editor: '',
        description: '',
        category: '',
        price: '',
        image: '',
        language: '',
        rate: '',
      });
      setping(!ping);
      onClose();
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="editor"
              value={formData.editor}
              onChange={handleChange}
              placeholder="Editor"
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Language"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              placeholder="Rate (0-5)"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="form-actions">
            <button type="submit">Add Book</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
