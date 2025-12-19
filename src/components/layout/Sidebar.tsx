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
  Menu,
  X,
  Presentation,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: '우선순위 분석', href: '/priority', icon: ListOrdered },
  { name: '벤치마킹', href: '/benchmarking', icon: GitCompare },
  { name: '시뮬레이션', href: '/simulation', icon: Calculator },
  { name: '체크리스트', href: '/checklist', icon: ClipboardCheck },
  { name: '프로젝트 소개', href: '/about', icon: Info },
  { name: '발표자료', href: '/presentation.html', icon: Presentation, external: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-white shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen transition-all duration-300',
          'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950',
          'border-r border-white/5',
          // 모바일: 기본 숨김, mobileOpen일 때 표시
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // 데스크탑: collapsed 상태에 따라 너비 변경
          collapsed ? 'lg:w-20' : 'lg:w-64',
          'w-64'
        )}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 lg:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white"
        >
          <X className="h-4 w-4" />
        </button>

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
            <Link href="/" className="mx-auto hidden lg:block">
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
              const isExternal = 'external' in item && item.external;

              const linkContent = (
                <>
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

                  {/* 모바일에서는 항상 표시, 데스크탑에서는 collapsed 상태에 따라 */}
                  <span className={cn(
                    'relative z-10',
                    collapsed ? 'lg:hidden' : ''
                  )}>{item.name}</span>
                </>
              );

              const linkClassName = cn(
                'relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              );

              return (
                <li key={item.name}>
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {linkContent}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={linkClassName}
                    >
                      {linkContent}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Button - 데스크탑에서만 표시 */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-white/10 text-white hover:bg-slate-700 hover:border-teal-500/50 transition-all shadow-lg"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>

        {/* Footer Stats Widget */}
        <div className={cn(
          'absolute bottom-4 left-0 right-0 px-3',
          collapsed ? 'lg:hidden' : ''
        )}>
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

        {/* Collapsed Footer - 데스크탑 collapsed 상태에서만 */}
        {collapsed && (
          <div className="hidden lg:block absolute bottom-4 left-0 right-0 px-3">
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
