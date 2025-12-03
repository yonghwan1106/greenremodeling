'use client';

import { Building2, CheckCircle2, Clock, AlertTriangle, Leaf, Zap } from 'lucide-react';
import { DashboardStats } from '@/types';
import { useEffect, useState, useRef } from 'react';

interface StatsCardsProps {
  stats: DashboardStats;
}

// 숫자 카운팅 애니메이션 컴포넌트
function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: '관리 건물',
      value: stats.totalBuildings,
      unit: '동',
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      textColor: 'text-blue-400',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: '리모델링 완료',
      value: stats.completed,
      unit: '동',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      textColor: 'text-emerald-400',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: '진행 중',
      value: stats.inProgress,
      unit: '동',
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      textColor: 'text-amber-400',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: '긴급 대상',
      value: stats.urgent,
      unit: '동',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-500/10 to-rose-500/10',
      textColor: 'text-red-400',
      trend: '-15%',
      trendUp: false,
    },
    {
      title: 'CO₂ 감축량',
      value: stats.totalCo2Reduction,
      unit: 'tCO₂/년',
      icon: Leaf,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      textColor: 'text-green-400',
      trend: '+22%',
      trendUp: true,
    },
    {
      title: '에너지 절감',
      value: Math.round(stats.totalEnergySaving / 1000),
      unit: 'MWh/년',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      textColor: 'text-purple-400',
      trend: '+18%',
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="group relative rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Gradient Border on Hover */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

          {/* Card Content */}
          <div className="relative rounded-xl bg-slate-900 p-5 h-full">
            {/* Background Gradient */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.bgGradient} opacity-50`} />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-400">
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-bold text-white">
                  <AnimatedNumber value={card.value} />
                </span>
                <span className="text-sm text-slate-500">{card.unit}</span>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-medium ${card.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {card.trend}
                </span>
                <span className="text-xs text-slate-500">vs 지난달</span>
              </div>

              {/* Mini Sparkline */}
              <div className="mt-3 flex items-end gap-0.5 h-8">
                {[35, 55, 40, 70, 45, 60, 80].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm bg-gradient-to-t ${card.gradient} opacity-40 group-hover:opacity-70 transition-opacity`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
