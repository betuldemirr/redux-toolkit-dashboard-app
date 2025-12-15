import Image from "next/image";
import { Product } from "@/models/product";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <li className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-700">
      <button
        onClick={onDelete}
        title="Delete product"
        className="absolute right-3 top-3 rounded-lg bg-zinc-900/80 p-1 text-zinc-400 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
      >
        ✕
      </button>

      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="80px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-medium">{product.title}</h3>

          <p className="mt-2 line-clamp-2 text-xs text-zinc-400">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold">${product.price}</span>
            <span className="rounded-full bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}