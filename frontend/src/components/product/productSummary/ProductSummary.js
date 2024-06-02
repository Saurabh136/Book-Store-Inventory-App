import React, { useEffect} from "react";
import "./ProductSummary.scss";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";

import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_GENRE,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  CALC_TOTAL_SALES, // Import the CALC_TOTAL_SALES action

  
  selectGenre,
  selectOutOfStock,
  selectTotalStoreValue,
  selectTotalSales, // Import the selectTotalSales selector
  

} from "../../../redux/features/product/productSlice";


// Icons
const earningIcon = <FaIndianRupeeSign size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const genreIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
const salesIcon = <FcSalesPerformance size={40} color="#fff" />;


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const genre = useSelector(selectGenre);
  const totalSales = useSelector(selectTotalSales); // Get total sales from Redux state
  //const totalSales = useSelector((state) => state.products.totalSales);

  useEffect(() => {
    
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_GENRE(products));
    dispatch(CALC_TOTAL_SALES()); // Dispatch action to calculate total sales
    
  
    
  }, [dispatch, products]);

  

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`₹${formatNumbers(totalStoreValue ? totalStoreValue.toFixed(2) : '0.00')}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={genreIcon}
          title={"All Categories"}
          count={genre.length}
          bgColor="card4"
        />
        <InfoBox
          icon={salesIcon} // You can define the salesIcon if needed
          title={"Total Sales"}
          count={`₹${formatNumbers(totalSales ? totalSales.toFixed(2) : '0.00')}`} // Format the totalSales amount as needed
          bgColor="card5" // Define the background color for the card if needed
        /> 
        
          
        
      </div>
    </div>
  );
};

export default ProductSummary;