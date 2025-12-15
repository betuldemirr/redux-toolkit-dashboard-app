"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  classname?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  classname = "",
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-500 focus:border-zinc-600 focus:outline-none ${classname}`}
    />
  );
}