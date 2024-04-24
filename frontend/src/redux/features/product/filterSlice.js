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
        const titleLower = (product.title && typeof product.title === "string") ? product.title.toLowerCase() : "";
        const genreLower = (product.genre && typeof product.genre === "string") ? product.genre.toLowerCase() : "";
        const seriesLower = (product.series && typeof product.series === "string") ? product.series.toLowerCase() : "";
        const serialNumberLower = (product.serialnumber && typeof product.serialnumber === "number") ? product.serialnumber.toLowerCase() : "";
        const primaryAuthorLower = (product.primaryauthor && typeof product.primaryauthor === "string") ? product.primaryauthor.toLowerCase() : "";
        const secondaryAuthorLower = (product.secondaryauthor && typeof product.secondaryauthor === "string") ? product.secondaryauthor.toLowerCase() : "";
        const editorLower = (product.editor && typeof product.editor === "string") ? product.editor.toLowerCase() : "";
        const publisherLower = (product.publisher && typeof product.publisher === "string") ? product.publisher.toLowerCase() : "";
        const editionLower = (product.edition && typeof product.edition === "string") ? product.edition.toLowerCase() : "";
        const conditionLower = (product.condition && typeof product.condition === "string") ? product.condition.toLowerCase() : "";
        const descriptionLower = (product.description && typeof product.description === "string") ? product.description.toLowerCase() : "";
        const imageLower = (product.image && typeof product.image === "string") ? product.image.toLowerCase() : "";

        return (
          titleLower.includes(search.toLowerCase()) ||
          genreLower.includes(search.toLowerCase()) ||
          seriesLower.includes(search.toLowerCase()) ||
          serialNumberLower.includes(search.toLowerCase()) ||
          primaryAuthorLower.includes(search.toLowerCase()) ||
          secondaryAuthorLower.includes(search.toLowerCase()) ||
          editorLower.includes(search.toLowerCase()) ||
          publisherLower.includes(search.toLowerCase()) ||
          editionLower.includes(search.toLowerCase()) ||
          conditionLower.includes(search.toLowerCase()) ||
          descriptionLower.includes(search.toLowerCase()) ||
          imageLower.includes(search.toLowerCase())
        );
      });
    
      state.filteredProducts = tempProducts;
    },
    
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
