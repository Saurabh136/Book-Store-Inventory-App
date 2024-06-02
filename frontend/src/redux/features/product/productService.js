import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products`;

const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}/${id}`, formData);
  return response.data;
};

const sellBook = async (id, quantity, price) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/sell`, { quantity, price });
    return response.data;
  } catch (error) {
    console.error("Error in sellBook service:", error);
    throw error;
  }
};
const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  sellBook,
};

export default productService;
