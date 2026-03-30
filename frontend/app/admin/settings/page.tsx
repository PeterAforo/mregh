'use client';
import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';

const defaultSettings = [
  { key: 'site_name', label: 'Site Name', group: 'general', value: 'MRE Construction' },
  { key: 'site_tagline', label: 'Tagline', group: 'general', value: 'Building Creative Communities' },
  { key: 'contact_email', label: 'Contact Email', group: 'contact', value: 'info@mrerealestate.com' },
  { key: 'contact_phone', label: 'Contact Phone', group: 'contact', value: '+233 24 000 0000' },
  { key: 'contact_address', label: 'Address', group: 'contact', value: 'Accra, Ghana' },
  { key: 'facebook_url', label: 'Facebook URL', group: 'social', value: '' },
  { key: 'instagram_url', label: 'Instagram URL', group: 'social', value: '' },
  { key: 'linkedin_url', label: 'LinkedIn URL', group: 'social', value: '' },
  { key: 'twitter_url', label: 'Twitter/X URL', group: 'social', value: '' },
  { key: 'meta_description', label: 'Meta Description', group: 'seo', value: 'MRE Construction – Premium construction services in Ghana.' },
  { key: 'google_analytics', label: 'Google Analytics ID', group: 'seo', value: '' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getSettings().then((data: any[]) => {
      if (data?.length) {
        setSettings(prev => prev.map(s => {
          const found = data.find((d: any) => d.key === s.key);
          return found ? { ...s, value: found.value || s.value } : s;
        }));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const update = (key: string, val: string) => setSettings(s => s.map(item => item.key === key ? { ...item, value: val } : item));

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.saveSettings(settings.map(s => ({ key: s.key, value: s.value, group: s.group })));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { alert('Save failed.'); } finally { setSaving(false); }
  };

  const groups = [
    { id: 'general', label: 'General' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'social', label: 'Social Links' },
    { id: 'seo', label: 'SEO' },
  ];

  const inp = "w-full bg-dark-200 border border-white/10 text-white px-4 py-2.5 text-sm focus:border-brand-red focus:outline-none transition-colors";
  const lbl = "text-gray-400 text-sm block mb-1.5";

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 size={32} className="text-brand-red animate-spin" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black font-display text-white">Site Settings</h2>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-brand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-70">
          <Save size={16} />{saved ? 'Saved!' : saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
      <div className="space-y-8">
        {groups.map(group => {
          const groupItems = settings.filter(s => s.group === group.id);
          return (
            <div key={group.id} className="bg-dark-100 border border-white/5 p-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 pb-4 border-b border-white/5">{group.label}</h3>
              <div className="space-y-5">
                {groupItems.map(item => (
                  <div key={item.key}>
                    <label className={lbl}>{item.label}</label>
                    {item.key === 'meta_description' || item.key === 'contact_address' ? (
                      <textarea rows={3} value={item.value} onChange={e => update(item.key, e.target.value)} className={inp + ' resize-none'} />
                    ) : (
                      <input type={item.key.includes('url') ? 'url' : item.key.includes('email') ? 'email' : 'text'}
                        value={item.value} onChange={e => update(item.key, e.target.value)} className={inp} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
