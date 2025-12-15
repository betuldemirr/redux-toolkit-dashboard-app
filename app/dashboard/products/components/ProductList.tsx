import { Product } from "@/models/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

export default function ProductList({ products, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return <p className="text-sm text-zinc-400">No products found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </ul>
  );
}
