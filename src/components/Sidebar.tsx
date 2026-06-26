"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Board", href: "/board" },
  { label: "Tarefas", href: "/tasks" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col p-6 gap-8">
      <span className="text-xl font-bold text-white">TaskFlow</span>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${pathname === item.href
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}