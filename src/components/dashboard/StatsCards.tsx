'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CheckCircle2, Clock, AlertTriangle, Leaf, Zap } from 'lucide-react';
import { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: '관리 건물',
      value: stats.totalBuildings,
      unit: '동',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '리모델링 완료',
      value: stats.completed,
      unit: '동',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: '진행 중',
      value: stats.inProgress,
      unit: '동',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: '긴급 대상',
      value: stats.urgent,
      unit: '동',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'CO₂ 감축량',
      value: stats.totalCo2Reduction,
      unit: 'tCO₂/년',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '에너지 절감',
      value: Math.round(stats.totalEnergySaving / 1000),
      unit: 'MWh/년',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <Card key={card.title} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">
                {card.value.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500">{card.unit}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
