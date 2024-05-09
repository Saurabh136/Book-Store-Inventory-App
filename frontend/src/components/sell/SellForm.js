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

  // const handleSellBook = async (title, quantity) => {
  //   try {
  //     console.log("Attempting to sell book:", title, quantity); // Add this line
  //     await productService.sellBook(title, quantity);
  //     console.log("Book sold successfully"); // Add this line
  //     // Handle success, e.g., show a success message or update UI
  //   } catch (error) {
  //     console.error("Error selling book:", error); // Add this line
  //     // Handle error, e.g., show an error message or handle accordingly
  //   }
  // };
  const handleSellBook = async (title, quantity) => {
  try {
    const products = await productService.getProducts(); // Fetch all products
    const existingProduct = products.find(product => product.title === title); // Check if the book title already exists in products

    if (existingProduct) {
      // If the book title exists, reduce the quantity
      const updatedQuantity = existingProduct.quantity - quantity;
      if (updatedQuantity < 0) {
        throw new Error("Not enough stock available"); // Ensure quantity doesn't go negative
      }
      await productService.updateProduct(existingProduct._id, { quantity: updatedQuantity });
    } else {
      // If the book title is new, add it with negative quantity
      await productService.createProduct({ title, quantity: -quantity });
    }
    console.log("Book sold successfully"); // Add a success message

    // Handle success, e.g., show a success message or update UI
  } catch (error) {
    // Handle error, e.g., show an error message or handle accordingly
    console.error("Error selling book:", error); // Log the error for debugging
  }
};


  const onSubmit = (data) => {
    console.log("Form submitted with data:", data); // Add this line
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
