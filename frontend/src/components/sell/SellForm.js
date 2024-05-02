import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sellBook } from '../../redux/features/product/productSlice';
import { selectIsLoading } from '../../redux/features/product/productSlice';
import '../sell/SellForm.scss'; // Import SCSS file

const SellForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [formData, setFormData] = useState({
    bookTitle: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sellBook(formData));
    setFormData({
      bookTitle: '',
      quantity: '',
    });
  };

  return (
    <div className="sell-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookTitle">Book Title:</label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Selling...' : 'Sell Book'}
        </button>
      </form>
    </div>
  );
};

export default SellForm;
