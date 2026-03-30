'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { adminApi } from '@/lib/api';

const empty = { title: '', slug: '', description: '', icon: '', image: '', features: '', order: 0, published: false };

export default function ServiceForm() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      adminApi.getServices().then((list: any[]) => {
        const item = list.find((p: any) => p.id === Number(params.id));
        if (item) setForm({ ...empty, ...item, features: Array.isArray(item.features) ? item.features.join(', ') : item.features || '' });
      });
    }
  }, [isNew, params.id]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, features: form.features ? form.features.split(',').map((s: string) => s.trim()) : [] };
      if (isNew) await adminApi.createService(payload);
      else await adminApi.updateService(Number(params.id), payload);
      router.push('/admin/services');
    } catch { alert('Save failed.'); } finally { setSaving(false); }
  };

  const inp = "w-full bg-dark-200 border border-white/10 text-white px-4 py-2.5 text-sm focus:border-brand-red focus:outline-none transition-colors";
  const lbl = "text-gray-400 text-sm block mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black font-display text-white">{isNew ? 'Add Service' : 'Edit Service'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-dark-100 border border-white/5 p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>Title *</label><input required value={form.title} onChange={e => set('title', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} className={inp} placeholder="auto-generated" /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>Icon (lucide name)</label><input value={form.icon} onChange={e => set('icon', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Display Order</label><input type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} className={inp} /></div>
        </div>
        <div><label className={lbl}>Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Description</label><textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)} className={inp + ' resize-none'} /></div>
        <div><label className={lbl}>Features (comma-separated)</label><input value={form.features} onChange={e => set('features', e.target.value)} className={inp} /></div>
        <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="accent-brand-red w-4 h-4" /> Published
        </label>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-70">
            <Save size={16} />{saving ? 'Saving...' : 'Save Service'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-sm text-gray-400 border border-white/10 hover:border-white/30 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
