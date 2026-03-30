'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { login } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      localStorage.setItem('mre_token', data.access_token);
      localStorage.setItem('mre_user', JSON.stringify(data.user));
      router.push('/admin');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-DEFAULT flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/logo/logo.png" alt="MRE" fill sizes="80px" className="object-contain" />
          </div>
          <h1 className="text-2xl font-black font-display text-white">MRE Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Content Management System</p>
        </div>

        {/* Form */}
        <div className="bg-dark-100 border border-white/10 p-8">
          <h2 className="text-white font-bold text-xl mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-dark-200 border border-white/10 text-white pl-11 pr-4 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors"
                  placeholder="admin@mrerealestate.com"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-dark-200 border border-white/10 text-white pl-11 pr-12 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm bg-red-900/20 px-4 py-3 border border-red-800">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-brand-red text-white py-3 font-bold uppercase tracking-wider hover:bg-brand-red-dark transition-all duration-300 disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-gray-600 text-xs text-center mt-6">
            Default: admin@mrerealestate.com / Admin@MRE2024
          </p>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-gray-600 hover:text-brand-red text-sm transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
