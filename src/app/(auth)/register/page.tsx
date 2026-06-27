"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema, RegisterFormData } from "@/schemas/authSchema";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      setIsLoading(false);
      return;
    }

    toast.success("Conta criada com sucesso!");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 p-8 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-slate-900">TaskFlow</span>
          <span className="text-sm text-slate-500">Crie sua conta</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-700">Nome</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Seu nome"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-700">E-mail</label>
            <input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-700">Senha</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-700">Confirmar senha</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <span className="text-sm text-slate-500 text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="text-slate-900 font-medium hover:underline">
            Entre aqui
          </a>
        </span>
      </div>
    </div>
  );
}