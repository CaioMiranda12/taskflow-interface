"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdViewKanban, MdChecklist } from "react-icons/md";

const navItems = [
  { label: "Dashboard", href: "/", icon: MdDashboard },
  { label: "Board", href: "/board", icon: MdViewKanban },
  { label: "Tarefas", href: "/tasks", icon: MdChecklist },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col p-6 gap-8">
      <span className="text-xl font-bold text-white">TaskFlow</span>

      <nav className="flex flex-col gap-1">
        {navItems.map((navItem) => {
          const Icon = navItem.icon;
          const isActive = pathname === navItem.href;

          return (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${isActive
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <Icon size={18} />
              {navItem.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}