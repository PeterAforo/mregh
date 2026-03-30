'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { adminApi } from '@/lib/api';

const empty = { name: '', role: '', department: '', bio: '', image: '', linkedin: '', email: '', order: 0, published: false };

export default function TeamForm() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      adminApi.getTeam().then((list: any[]) => {
        const item = list.find((p: any) => p.id === Number(params.id));
        if (item) setForm({ ...empty, ...item });
      });
    }
  }, [isNew, params.id]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (isNew) await adminApi.createTeamMember(form);
      else await adminApi.updateTeamMember(Number(params.id), form);
      router.push('/admin/team');
    } catch { alert('Save failed.'); } finally { setSaving(false); }
  };

  const inp = "w-full bg-dark-200 border border-white/10 text-white px-4 py-2.5 text-sm focus:border-brand-red focus:outline-none transition-colors";
  const lbl = "text-gray-400 text-sm block mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black font-display text-white">{isNew ? 'Add Team Member' : 'Edit Team Member'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-dark-100 border border-white/5 p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Role *</label><input required value={form.role} onChange={e => set('role', e.target.value)} className={inp} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>Department</label><input value={form.department} onChange={e => set('department', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Display Order</label><input type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} className={inp} /></div>
        </div>
        <div><label className={lbl}>Photo URL</label><input value={form.image} onChange={e => set('image', e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Bio</label><textarea rows={4} value={form.bio} onChange={e => set('bio', e.target.value)} className={inp + ' resize-none'} /></div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className={lbl}>LinkedIn URL</label><input value={form.linkedin} onChange={e => set('linkedin', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inp} /></div>
        </div>
        <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="accent-brand-red w-4 h-4" /> Published
        </label>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-70">
            <Save size={16} />{saving ? 'Saving...' : 'Save Member'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-sm text-gray-400 border border-white/10 hover:border-white/30 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
