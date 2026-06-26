interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2">
      <span className="text-2xl">📭</span>
      <span className="text-sm font-medium text-slate-700">{title}</span>
      <span className="text-xs text-slate-400">{description}</span>
    </div>
  );
}