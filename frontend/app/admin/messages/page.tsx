'use client';
import { useEffect, useState } from 'react';
import { Trash2, Loader2, Mail, MailOpen, Calendar, Phone } from 'lucide-react';
import { adminApi } from '@/lib/api';

export default function AdminMessages() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const load = async () => { setLoading(true); try { setData(await adminApi.getMessages()); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => { await adminApi.markMessageRead(id); load(); };
  const del = async (id: number) => { if (!confirm('Delete this message?')) return; await adminApi.deleteMessage(id); setSelected(null); load(); };

  const open = (msg: any) => { setSelected(msg); if (!msg.read) markRead(msg.id); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black font-display text-white">Contact Messages</h2>
        <span className="text-gray-500 text-sm">{data.filter(m => !m.read).length} unread</span>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-100 border border-white/5 overflow-hidden">
          {loading ? <div className="flex items-center justify-center py-16"><Loader2 size={32} className="text-brand-red animate-spin" /></div> : (
            <div>
              {data.length === 0 && <div className="text-center py-16 text-gray-500">No messages yet.</div>}
              {data.map(msg => (
                <div key={msg.id} onClick={() => open(msg)}
                  className={`border-b border-white/5 px-5 py-4 cursor-pointer transition-colors ${selected?.id === msg.id ? 'bg-brand-red/10 border-l-2 border-l-brand-red' : 'hover:bg-white/3'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="mt-0.5 flex-shrink-0">{msg.read ? <MailOpen size={16} className="text-gray-500" /> : <Mail size={16} className="text-brand-red" />}</div>
                      <div className="min-w-0">
                        <div className={`text-sm font-semibold truncate ${msg.read ? 'text-gray-400' : 'text-white'}`}>{msg.name}</div>
                        <div className="text-xs text-gray-500 truncate">{msg.subject}</div>
                        <div className="text-xs text-gray-600 truncate mt-0.5">{msg.email}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-dark-100 border border-white/5 p-6">
          {!selected ? (
            <div className="flex items-center justify-center h-48 text-gray-500 text-sm">Select a message to view</div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">{selected.name}</h3>
                  <div className="text-gray-400 text-sm mt-0.5">{selected.subject}</div>
                </div>
                <button onClick={() => del(selected.id)} className="w-8 h-8 bg-dark-200 hover:bg-red-900/30 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm"><Mail size={14} className="text-brand-red" />{selected.email}</div>
                {selected.phone && <div className="flex items-center gap-2 text-gray-400 text-sm"><Phone size={14} className="text-brand-red" />{selected.phone}</div>}
                <div className="flex items-center gap-2 text-gray-400 text-sm"><Calendar size={14} className="text-brand-red" />{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <div className="bg-dark-200 p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="mt-4 inline-flex items-center gap-2 bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors">
                <Mail size={14} /> Reply via Email
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
