"use client";

import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import LoadingState from "@/app/components/LoadingState";
import ErrorState from "@/app/components/ErrorState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  deleteProductThunk,
  fetchProductsThunk,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "@/modules/products";
import AddProductModal from "./components/AddProductModal";
import Button from "@/app/components/Button";
import SearchInput from "@/app/components/SeachInput";
import CategoryFilter from "./components/CategoryFilter";
import { PRODUCT_CATEGORIES } from "@/app/constants/categories";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, products.length]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingState type="product" count={9} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load products"
        message={error}
        onRetry={() => dispatch(fetchProductsThunk())}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-sm text-zinc-400">Browse and manage products</p>
        </div>
        <Button variant="primary" onClick={() => setIsAddOpen(true)}>
          + Add Product
        </Button>
      </div>

      <div className="flex-wrap space-y-4">
        <SearchInput value={search} onChange={setSearch}/>
        <CategoryFilter
          categories={PRODUCT_CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {isAddOpen && <AddProductModal onClose={() => setIsAddOpen(false)} />}

      <ProductList
        products={filteredProducts}
        onDelete={(id) => dispatch(deleteProductThunk(id))}
      />
    </div>
  );
}