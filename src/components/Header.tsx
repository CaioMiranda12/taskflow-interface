"use client";

import { MdNotifications, MdLogout } from "react-icons/md";
import { useLogout } from "@/hooks/useLogout";
import { useMe } from "@/hooks/useMe";

export function Header() {
  const { logout } = useLogout();
  const { user, isLoading } = useMe();

  return (
    <header className="h-16 border-b border-slate-200 flex items-center px-4 md:px-6 justify-between bg-white">
      <h1 className="text-sm font-medium text-slate-500 pl-10 md:pl-0">
        Bem-vindo ao TaskFlow
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MdNotifications size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            {!isLoading && user && (
              <span className="text-xs font-medium text-slate-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="hidden md:block text-sm text-slate-700">
            {isLoading ? "Carregando..." : user?.name ?? ""}
          </span>
        </div>

        <button
          onClick={logout}
          className="text-slate-400 hover:text-red-500 transition-colors"
          title="Sair"
        >
          <MdLogout size={20} />
        </button>
      </div>
    </header>
  );
}