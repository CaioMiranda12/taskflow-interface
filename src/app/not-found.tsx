import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-6xl font-bold text-slate-200">404</span>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-slate-900">
            Página não encontrada
          </span>
          <span className="text-sm text-slate-500">
            A página que você tentou acessar não existe.
          </span>
        </div>
        <Link
          href="/"
          className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}