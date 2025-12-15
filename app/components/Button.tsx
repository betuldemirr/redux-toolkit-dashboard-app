"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        variant === "primary" && "bg-white text-black hover:bg-zinc-200",
        variant === "secondary" &&
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        variant === "danger" && "bg-red-500 text-white hover:bg-red-600",
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}