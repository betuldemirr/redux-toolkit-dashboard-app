"use client";

import { useEffect, useState } from "react";
import { Product } from "@/models/product";
import { fetchProducts } from "@/services/products.api";
import ProductList from "./components/ProductList";
import LoadingState from "@/app/components/LoadingState";
import ErrorState from "@/app/components/ErrorState";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <LoadingState type="product" count={9} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load products"
        message={error}
        onRetry={loadProducts}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Products</h1>
        <p className="text-sm text-zinc-400">
          Browse and manage products
        </p>
      </div>

      <ProductList products={products} />
    </div>
  );
}