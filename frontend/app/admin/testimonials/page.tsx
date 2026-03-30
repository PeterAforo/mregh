'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react';
import { adminApi } from '@/lib/api';

export default function AdminTestimonials() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { setData(await adminApi.getTestimonials()); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const del = async (id: number) => { if (!confirm('Delete?')) return; await adminApi.deleteTestimonial(id); load(); };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black font-display text-white">Testimonials</h2>
        <Link href="/admin/testimonials/new" className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors"><Plus size={16} /> Add Testimonial</Link>
      </div>
      <div className="bg-dark-100 border border-white/5">
        {loading ? <div className="flex items-center justify-center py-16"><Loader2 size={32} className="text-brand-red animate-spin" /></div> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5">{['Client', 'Company', 'Rating', 'Status', 'Actions'].map(h => <th key={h} className="text-left px-6 py-4 text-gray-500 text-xs uppercase">{h}</th>)}</tr></thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id} className="border-b border-white/5 last:border-0 hover:bg-white/2">
                    <td className="px-6 py-4 text-white text-sm font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{row.company}</td>
                    <td className="px-6 py-4"><div className="flex gap-0.5">{Array.from({ length: row.rating || 5 }).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div></td>
                    <td className="px-6 py-4"><span className={`text-xs font-bold uppercase px-2 py-1 ${row.published ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-500'}`}>{row.published ? 'Published' : 'Draft'}</span></td>
                    <td className="px-6 py-4"><div className="flex gap-2">
                      <Link href={`/admin/testimonials/${row.id}`} className="w-8 h-8 bg-dark-200 hover:bg-brand-red/20 flex items-center justify-center text-gray-400 hover:text-brand-red transition-colors"><Pencil size={14} /></Link>
                      <button onClick={() => del(row.id)} className="w-8 h-8 bg-dark-200 hover:bg-red-900/30 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && <div className="text-center py-16 text-gray-500">No testimonials yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
