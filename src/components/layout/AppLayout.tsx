'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <Header title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
