'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ListOrdered,
  GitCompare,
  Calculator,
  ClipboardCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  Leaf,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: '우선순위 분석', href: '/priority', icon: ListOrdered },
  { name: '벤치마킹', href: '/benchmarking', icon: GitCompare },
  { name: '시뮬레이션', href: '/simulation', icon: Calculator },
  { name: '체크리스트', href: '/checklist', icon: ClipboardCheck },
  { name: '프로젝트 소개', href: '/about', icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300',
        'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950',
        'border-r border-white/5',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      {/* Logo */}
      <div className="relative flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">GRDP</span>
              <span className="block text-[10px] text-slate-500 -mt-1">Green Remodeling</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="relative mt-6 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {/* Active background with glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30" />
                  )}

                  {/* Neon glow indicator for active item */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-teal-400 to-cyan-400 shadow-lg shadow-teal-500/50" />
                  )}

                  <div className={cn(
                    'relative z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all',
                    isActive
                      ? 'bg-gradient-to-br from-teal-500 to-cyan-500 shadow-md shadow-teal-500/30'
                      : 'bg-slate-800/50'
                  )}>
                    <item.icon className={cn(
                      'h-4 w-4 flex-shrink-0',
                      isActive ? 'text-white' : 'text-slate-400'
                    )} />
                  </div>

                  {!collapsed && (
                    <span className="relative z-10">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-white/10 text-white hover:bg-slate-700 hover:border-teal-500/50 transition-all shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Footer Stats Widget */}
      {!collapsed && (
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-800/50 border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">탄소중립 기여</p>
                <p className="text-[10px] text-slate-500">GRDP Platform</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">CO₂ 감축 목표</span>
                  <span className="text-emerald-400 font-medium">67%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] text-slate-500">분석 건물</span>
                <span className="text-xs font-bold text-white">500+</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Footer */}
      {collapsed && (
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
