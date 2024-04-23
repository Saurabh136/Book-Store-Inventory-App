import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      
      const tempProducts = products.filter((product) => {
        const titleLower = product.title ? product.title.toLowerCase() : "";
        const genreLower = product.genre ? product.genre.toLowerCase() : "";
        return (
          titleLower.includes(search.toLowerCase()) ||
          genreLower.includes(search.toLowerCase())
        );
      });

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
