export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 flex items-center px-6 justify-between bg-white">
      <h1 className="text-sm font-medium text-slate-500">
        Bem-vindo ao TaskFlow
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200" />
        <span className="text-sm text-slate-700">Ana Silva</span>
      </div>
    </header>
  );
}