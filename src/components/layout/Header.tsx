'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-900/80 backdrop-blur-xl px-4 lg:px-6">
      {/* Left: Title & Search */}
      <div className="flex items-center gap-4 pl-12 lg:pl-0">
        {title && <h1 className="text-xl font-semibold text-white">{title}</h1>}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            type="search"
            placeholder="건물명, 주소로 검색..."
            className="w-64 pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500/50 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-white/5">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-teal-500 to-cyan-500 border-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-800">
            <DropdownMenuLabel className="text-white">알림</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 text-slate-300 focus:bg-slate-800 focus:text-white">
              <span className="font-medium">2025년 1차 사업 신청 마감 D-7</span>
              <span className="text-xs text-slate-500">2025.01.08까지 신청서 제출 필요</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 text-slate-300 focus:bg-slate-800 focus:text-white">
              <span className="font-medium">행복경로당 사전조사 완료</span>
              <span className="text-xs text-slate-500">체크리스트 100% 완료되었습니다</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 text-slate-300 focus:bg-slate-800 focus:text-white">
              <span className="font-medium">신규 벤치마킹 사례 5건 등록</span>
              <span className="text-xs text-slate-500">경기도 지역 경로당 사례가 추가되었습니다</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
            <DropdownMenuLabel className="text-white">
              <div className="flex flex-col">
                <span>김담당 주무관</span>
                <span className="text-xs font-normal text-slate-500">OO시 시설관리팀</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white">프로필 설정</DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white">알림 설정</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
