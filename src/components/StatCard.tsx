interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
      <span className="text-sm text-slate-500">{title}</span>
      <span className="text-3xl font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-400">{description}</span>
    </div>
  );
}