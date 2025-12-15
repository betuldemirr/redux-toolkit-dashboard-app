"use client";

import Button from "@/app/components/Button";
import { createProductThunk } from "@/modules/products";
import { CreateProductPayload } from "@/services/products.api";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CategoryFilter from "./CategoryFilter";
import { PRODUCT_CATEGORIES } from "@/app/constants/categories";

interface AddProductModalProps {
  onClose: () => void;
}

export default function AddProductModal({ onClose }: AddProductModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateProductPayload>({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const onSubmit = async () => {
    const payload: CreateProductPayload = {
      ...form,
      price: form.price,
    };

    const result = await dispatch(createProductThunk(payload));

    if (createProductThunk.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-semibold">Add Product</h2>
        <div className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
          />
          <div className="space-y-2">
            <CategoryFilter
              categories={PRODUCT_CATEGORIES}
              selected={form.category}
              onSelect={(category) => setForm((f) => ({ ...f, category }))}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={loading}
            onClick={onSubmit}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
