'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 gradient-mesh-light opacity-30 pointer-events-none" />

      <Sidebar />
      {/* 모바일: padding 없음, 데스크탑: pl-64 */}
      <div className="lg:pl-64 transition-all duration-300">
        <Header title={title} />
        <main className="p-4 lg:p-6 relative">{children}</main>
      </div>
    </div>
  );
}
