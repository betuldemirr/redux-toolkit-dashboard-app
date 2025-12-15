import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, CreateProductPayload, deleteProduct, fetchProducts } from "@/services/products.api";
import { Product } from "@/models/product";

/**
 * Async thunk type definition
 * - returnType: fulfilled action payload
 * - arg: thunk argument (none in this case)
 * - rejectValue: rejected action payload
 */

type FetchProductsThunk = {
  returnType: Product[];
  arg: void;
  rejectValue: string;
};

type DeleteProductThunk = {
  returnType: number;
  arg: number;
  rejectValue: string;
};

type CreateProductThunk = {
  returnType: Product;
  arg: CreateProductPayload;
  rejectValue: string;
};

export const fetchProductsThunk = createAsyncThunk<
  FetchProductsThunk["returnType"],
  FetchProductsThunk["arg"],
  { rejectValue: FetchProductsThunk["rejectValue"] }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch products"
      );
    }
  }
);

export const deleteProductThunk = createAsyncThunk<
  DeleteProductThunk["returnType"],
  DeleteProductThunk["arg"],
  { rejectValue: DeleteProductThunk["rejectValue"] }
>("products/deleteProduct", async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to delete product"
      );
    }
  }
);

export const createProductThunk = createAsyncThunk<
    CreateProductThunk["returnType"],
    CreateProductThunk["arg"],
    { rejectValue: CreateProductThunk["rejectValue"] }
>("products/addProduct", async (payload, { rejectWithValue }) => {
        try {
            return await createProduct(payload);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Failed to add product"
            );
        }
    }
);