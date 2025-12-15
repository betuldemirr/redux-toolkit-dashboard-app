import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/models/product";
import { fetchProductsThunk, deleteProductThunk, createProductThunk } from "./products.thunks";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // UI events
  },
  extraReducers: (builder) => {
    //fetch
    builder
    .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
    })
    .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
    })
    //delete
    .addCase(deleteProductThunk.pending, (state) => {
        state.error = null;
    })
    .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );
    })
    .addCase(deleteProductThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete product";
    })
    //create
    .addCase(createProductThunk.pending, (state) => {
        state.error = null;
    })
    .addCase(createProductThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
    })
    .addCase(createProductThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add product";
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;