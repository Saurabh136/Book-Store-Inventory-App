import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  title: "",
  genre: "",
  quantity: "",
  price: "",
  series: "",
  serialnumber: "",
  primaryauthor: "",
  secondaryauthor: "",
  editor: "",
  publisher: "",
  edition: "",
  condition: "",
  description: "",

};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");


  const isLoading = useSelector(selectIsLoading);

  const { title, genre, price, quantity,series,serialnumber,primaryauthor,secondaryauthor,editor,publisher,edition,condition } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (genre) => {
    const letter = genre.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sku", generateKSKU(genre));
    formData.append("genre", genre);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("series", series);
    formData.append("serialnumber", serialnumber);
    formData.append("primaryauthor", primaryauthor);
    formData.append("secondaryauthor", secondaryauthor);
    formData.append("editor", editor);
    formData.append("publisher", publisher);
    formData.append("edition", edition);
    formData.append("condition", condition);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
