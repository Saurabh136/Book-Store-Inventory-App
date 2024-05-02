import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SellForm from "../../components/sell/SellForm"; // Create SellForm component
import { sellBook, selectIsLoading } from "../../redux/features/product/productSlice";

const initialState = {
  title: "",
  quantitySold: "",
  price: "",
};

const AddSell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sellData, setSellData] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellData({ ...sellData, [name]: value });
  };

  const sellBookHandler = async (e) => {
    e.preventDefault();
    await dispatch(sellBook(sellData)); // Assume sellBook action is implemented in productSlice.js
    navigate("/dashboard"); // Redirect to dashboard after selling book
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Sell Book</h3>
      <SellForm
        sellData={sellData}
        handleInputChange={handleInputChange}
        sellBookHandler={sellBookHandler}
      />
    </div>
  );
};

export default AddSell;
