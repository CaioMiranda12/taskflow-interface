"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdViewKanban, MdChecklist, MdMenu, MdClose } from "react-icons/md";

const navItems = [
  { label: "Dashboard", href: "/", icon: MdDashboard },
  { label: "Board", href: "/board", icon: MdViewKanban },
  { label: "Tarefas", href: "/tasks", icon: MdChecklist },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg"
      >
        {isOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={handleClose}
        />
      )}

      <aside
        className={`
          fixed z-40 h-screen bg-slate-900 text-white flex flex-col p-6 gap-8 transition-transform duration-300
          md:relative md:translate-x-0 md:w-64
          w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <span className="text-xl font-bold text-white pl-8 md:pl-0">TaskFlow</span>

        <nav className="flex flex-col gap-1">
          {navItems.map((navItem) => {
            const Icon = navItem.icon;
            const isActive = pathname === navItem.href;

            return (
              <Link
                key={navItem.href}
                href={navItem.href}
                onClick={handleClose}
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
    </>
  );
}