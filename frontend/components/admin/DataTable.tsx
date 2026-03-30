'use client';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';

interface Column { key: string; label: string; render?: (val: any, row: any) => React.ReactNode; }
interface Props {
  title: string; data: any[]; columns: Column[]; loading?: boolean;
  onAdd?: () => void; onEdit?: (row: any) => void; onDelete?: (row: any) => void;
}

export default function DataTable({ title, data, columns, loading, onAdd, onEdit, onDelete }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black font-display text-white">{title}</h2>
        {onAdd && (
          <button onClick={onAdd} className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors">
            <Plus size={16} /> Add New
          </button>
        )}
      </div>
      <div className="bg-dark-100 border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="text-brand-red animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {columns.map(col => (
                    <th key={col.key} className="text-left px-6 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                      {col.label}
                    </th>
                  ))}
                  {(onEdit || onDelete) && <th className="px-6 py-4 text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={row.id || i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    {columns.map(col => (
                      <td key={col.key} className="px-6 py-4 text-gray-300 text-sm">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          {onEdit && (
                            <button onClick={() => onEdit(row)} className="w-8 h-8 bg-dark-200 hover:bg-brand-red/20 flex items-center justify-center text-gray-400 hover:text-brand-red transition-colors">
                              <Pencil size={14} />
                            </button>
                          )}
                          {onDelete && (
                            <button onClick={() => onDelete(row)} className="w-8 h-8 bg-dark-200 hover:bg-red-900/30 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
