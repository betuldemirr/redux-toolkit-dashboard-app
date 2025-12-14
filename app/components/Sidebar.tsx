"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Users, LayoutGrid } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const menu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-zinc-800 px-4 py-5">
        <h1 className="text-lg font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menu.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-zinc-900" : "text-zinc-400"}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-zinc-800 px-4 py-4">
        <p className="text-xs text-zinc-500">
          © 2025 Dashboard App
        </p>
      </div>
    </div>
  );
}