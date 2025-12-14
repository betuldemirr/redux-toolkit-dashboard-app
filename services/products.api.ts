import { Product } from "@/models/product";

const BASE_URL = "https://fakestoreapi.com/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}