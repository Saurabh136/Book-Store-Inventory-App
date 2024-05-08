import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import productService from "../../redux/features/product/productService"; // Import your productService
import "./SellForm.scss"; // Import the SCSS file

const SellForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [bookTitle, setBookTitle] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const handleBookTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSellBook = async (title, quantity) => {
    try {
      await productService.sellBook(title, quantity);
      // Handle success, e.g., show a success message or update UI
    } catch (error) {
      // Handle error, e.g., show an error message or handle accordingly
    }
  };

  const onSubmit = (data) => {
    const { bookTitle, quantity } = data;
    handleSellBook(bookTitle, quantity);
    // You can add redirection or other actions after selling the book
  };

  return (
    <div className="sell-form-container">
      <h3>Sell Book</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Book Title:</label>
          <input
            type="text"
            {...register("bookTitle")}
            value={bookTitle}
            onChange={handleBookTitleChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            {...register("quantity")}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button type="submit">Sell</button>
      </form>
    </div>
  );
};

export default SellForm;
