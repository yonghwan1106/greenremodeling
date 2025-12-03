'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'completed',
    title: '사전조사 완료',
    description: '서울 강남구 행복경로당',
    time: '2시간 전',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 2,
    type: 'in_progress',
    title: '시뮬레이션 진행 중',
    description: '부산 해운대구 사랑어린이집',
    time: '4시간 전',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'urgent',
    title: '긴급 점검 필요',
    description: '대구 수성구 중앙보건소',
    time: '1일 전',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 4,
    type: 'report',
    title: '보고서 생성',
    description: '2024년 4분기 리모델링 현황',
    time: '2일 전',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export function RecentActivity() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`rounded-lg p-2 ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900">{activity.title}</p>
                <p className="text-sm text-slate-500 truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
