'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { adminApi } from '@/lib/api';

const empty = { name: '', company: '', role: '', content: '', image: '', rating: 5, published: false };

export default function TestimonialForm() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      adminApi.getTestimonials().then((list: any[]) => {
        const item = list.find((p: any) => p.id === Number(params.id));
        if (item) setForm({ ...empty, ...item });
      });
    }
  }, [isNew, params.id]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (isNew) await adminApi.createTestimonial(form);
      else await adminApi.updateTestimonial(Number(params.id), form);
      router.push('/admin/testimonials');
    } catch { alert('Save failed.'); } finally { setSaving(false); }
  };

  const inp = "w-full bg-dark-200 border border-white/10 text-white px-4 py-2.5 text-sm focus:border-brand-red focus:outline-none transition-colors";
  const lbl = "text-gray-400 text-sm block mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black font-display text-white">{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-dark-100 border border-white/5 p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>Client Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Company</label><input value={form.company} onChange={e => set('company', e.target.value)} className={inp} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>Role / Title</label><input value={form.role} onChange={e => set('role', e.target.value)} className={inp} /></div>
          <div>
            <label className={lbl}>Rating (1-5)</label>
            <select value={form.rating} onChange={e => set('rating', Number(e.target.value))} className={inp}>
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} stars</option>)}
            </select>
          </div>
        </div>
        <div><label className={lbl}>Photo URL</label><input value={form.image} onChange={e => set('image', e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Testimonial Content *</label><textarea required rows={5} value={form.content} onChange={e => set('content', e.target.value)} className={inp + ' resize-none'} /></div>
        <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="accent-brand-red w-4 h-4" /> Published
        </label>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-70">
            <Save size={16} />{saving ? 'Saving...' : 'Save Testimonial'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-sm text-gray-400 border border-white/10 hover:border-white/30 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
