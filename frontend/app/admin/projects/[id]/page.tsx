'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { adminApi } from '@/lib/api';

const empty = { title: '', slug: '', description: '', category: '', location: '', year: '', image: '', gallery: '', featured: false, published: false };

export default function ProjectForm() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      adminApi.getProjectById(Number(params.id)).then((item: any) => {
        if (item) setForm({ ...empty, ...item, gallery: Array.isArray(item.gallery) ? item.gallery.join(', ') : item.gallery || '' });
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [isNew, params.id]);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, gallery: form.gallery ? form.gallery.split(',').map((s: string) => s.trim()) : [] };
      if (isNew) await adminApi.createProject(payload);
      else await adminApi.updateProject(Number(params.id), payload);
      router.push('/admin/projects');
    } catch (err) { alert('Save failed.'); } finally { setSaving(false); }
  };

  const inputCls = "w-full bg-dark-200 border border-white/10 text-white px-4 py-2.5 text-sm focus:border-brand-red focus:outline-none transition-colors";
  const labelCls = "text-gray-400 text-sm block mb-1.5";

  if (loading) return <div className="flex items-center justify-center py-16 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black font-display text-white">{isNew ? 'Add Project' : 'Edit Project'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-dark-100 border border-white/5 p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={labelCls}>Title *</label><input required value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} className={inputCls} placeholder="auto-generated" /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Category *</label>
            <select required value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
              <option value="">Select...</option>
              {['Residential', 'Commercial', 'Civil Engineering', 'Interior Design', 'Renovation'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Location</label><input value={form.location} onChange={e => set('location', e.target.value)} className={inputCls} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={labelCls}>Year</label><input value={form.year} onChange={e => set('year', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Cover Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} className={inputCls} /></div>
        </div>
        <div><label className={labelCls}>Description</label><textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)} className={inputCls + ' resize-none'} /></div>
        <div><label className={labelCls}>Gallery URLs (comma-separated)</label><input value={form.gallery} onChange={e => set('gallery', e.target.value)} className={inputCls} /></div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-brand-red w-4 h-4" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="accent-brand-red w-4 h-4" />
            Published
          </label>
        </div>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-70">
            <Save size={16} />{saving ? 'Saving...' : 'Save Project'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-sm text-gray-400 border border-white/10 hover:border-white/30 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
