'use client';
import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, Loader2, Copy, Check, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '@/lib/api';

export default function AdminMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => { setLoading(true); try { setMedia(await adminApi.getMedia()); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) { await adminApi.uploadFile(file); }
      load();
    } catch { alert('Upload failed.'); } finally { setUploading(false); if (inputRef.current) inputRef.current.value = ''; }
  };

  const del = async (id: number) => { if (!confirm('Delete this file?')) return; await adminApi.deleteMedia(id); load(); };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black font-display text-white">Media Library</h2>
        <button onClick={() => inputRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-70">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={32} className="text-brand-red animate-spin" /></div>
      ) : media.length === 0 ? (
        <div className="bg-dark-100 border border-white/5 border-dashed py-16 text-center">
          <ImageIcon size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No media files yet. Upload some images.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((file) => (
            <div key={file.id} className="bg-dark-100 border border-white/5 overflow-hidden group relative">
              <div className="aspect-square relative">
                <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(file.id, file.url)} className="w-8 h-8 bg-white/10 hover:bg-brand-red flex items-center justify-center text-white transition-colors">
                    {copied === file.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button onClick={() => del(file.id)} className="w-8 h-8 bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-gray-400 text-xs truncate">{file.filename}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
