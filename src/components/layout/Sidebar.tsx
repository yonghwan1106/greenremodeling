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
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: '우선순위 분석', href: '/priority', icon: ListOrdered },
  { name: '벤치마킹', href: '/benchmarking', icon: GitCompare },
  { name: '시뮬레이션', href: '/simulation', icon: Calculator },
  { name: '체크리스트', href: '/checklist', icon: ClipboardCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold">GRDP</span>
          </Link>
        )}
        {collapsed && (
          <Building2 className="mx-auto h-8 w-8 text-emerald-500" />
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="rounded-lg bg-slate-800 p-3 text-xs text-slate-400">
            <p className="font-medium text-emerald-500">그린리모델링</p>
            <p className="mt-1">의사결정 지원 플랫폼</p>
          </div>
        </div>
      )}
    </aside>
  );
}
