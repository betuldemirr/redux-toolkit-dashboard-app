import axios from "axios";
import { Product } from "@/models/product";

const BASE_URL = "https://fakestoreapi.com/products";

//get
export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>(BASE_URL);
  return response.data;
}

//delete
export async function deleteProduct(id: number): Promise<{ id: number }> {
  const response = await axios.delete<{ id: number }>(
    `${BASE_URL}/${id}`
  );
  return response.data;
}

//create
export type CreateProductPayload = Omit<Product, "id">;

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const res = await axios.post<Product>(BASE_URL, payload);
  return res.data;
}