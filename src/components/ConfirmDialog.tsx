interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({ title, description, onConfirm, onCancel, isLoading }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-slate-900">{title}</span>
          <span className="text-sm text-slate-500">{description}</span>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Removendo..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}