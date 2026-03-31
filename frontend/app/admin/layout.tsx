'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, FolderOpen, Wrench, Users, BookOpen,
  Star, Image as ImageIcon, MessageSquare, Settings, LogOut,
  Menu, X, ChevronRight, ExternalLink
} from 'lucide-react';
import ErrorBoundary from '@/components/admin/ErrorBoundary';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/admin/services', icon: Wrench, label: 'Services' },
  { href: '/admin/team', icon: Users, label: 'Team' },
  { href: '/admin/blog', icon: BookOpen, label: 'Blog' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/hero', icon: ImageIcon, label: 'Hero Slides' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/media', icon: ImageIcon, label: 'Media' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const token = localStorage.getItem('mre_token');
    if (!token) { router.push('/admin/login'); return; }
    const u = localStorage.getItem('mre_user');
    if (u) setUser(JSON.parse(u));
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem('mre_token');
    localStorage.removeItem('mre_user');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-DEFAULT flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-100 border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/logo/logo.png" alt="MRE" fill sizes="40px" className="object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-sm font-display">MRE Admin</div>
              <div className="text-gray-500 text-xs">CMS Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-brand-red/10 border-r-2 border-brand-red font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-brand-red" />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/5">
          <a href="/" target="_blank" className="flex items-center gap-2 text-gray-500 hover:text-white text-xs mb-3 transition-colors">
            <ExternalLink size={14} /> View Website
          </a>
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center text-white text-xs font-bold rounded-full">
                {user.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{user.name}</div>
                <div className="text-gray-500 text-xs truncate">{user.email}</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-xs transition-colors w-full">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-dark-100/95 backdrop-blur border-b border-white/5 h-16 flex items-center px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-400 hover:text-white mr-4">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex-1">
            <h1 className="text-white font-semibold text-sm">
              {navItems.find(n => n.href === pathname || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label || 'Dashboard'}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
