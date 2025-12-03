'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import {
  Building as BuildingIcon,
  Calendar,
  Ruler,
  Zap,
  Users,
  MapPin,
  ArrowRight,
  GitCompare,
  Calculator,
  ClipboardCheck,
} from 'lucide-react';
import Link from 'next/link';
import { Building, BUILDING_TYPE_LABELS, STATUS_LABELS } from '@/types';

interface BuildingDetailProps {
  building: Building;
}

export function BuildingDetail({ building }: BuildingDetailProps) {
  const radarData = [
    { subject: '노후도', value: building.scores.age, fullMark: 100 },
    { subject: '에너지', value: building.scores.energy, fullMark: 100 },
    { subject: '취약도', value: building.scores.vulnerability, fullMark: 100 },
    { subject: '효율성', value: building.scores.efficiency, fullMark: 100 },
    { subject: '형평성', value: building.scores.equity, fullMark: 100 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-red-600';
    if (score >= 60) return 'bg-amber-600';
    return 'bg-emerald-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{BUILDING_TYPE_LABELS[building.type]}</Badge>
                <Badge variant={building.status === 'completed' ? 'default' : building.status === 'in_progress' ? 'secondary' : 'destructive'}>
                  {STATUS_LABELS[building.status]}
                </Badge>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{building.name}</h2>
              <p className="flex items-center gap-1 text-slate-500">
                <MapPin className="h-4 w-4" />
                {building.address}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">우선순위 점수</p>
              <p className={`text-4xl font-bold ${getScoreColor(building.priorityScore)}`}>
                {building.priorityScore}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">준공연도</p>
                <p className="font-semibold">{building.yearBuilt}년</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Ruler className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">연면적</p>
                <p className="font-semibold">{building.grossArea}㎡</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Zap className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">EUI</p>
                <p className="font-semibold">{building.eui} kWh/㎡</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Users className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">일평균 이용자</p>
                <p className="font-semibold">{building.dailyUsers}명</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Radar Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">지표별 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Radar
                    name="점수"
                    dataKey="value"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Score Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">점수 상세</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: '노후도 (25%)', score: building.scores.age, desc: `준공 후 ${2024 - building.yearBuilt}년 경과` },
              { name: '에너지효율 (25%)', score: building.scores.energy, desc: `EUI ${building.eui} kWh/㎡, ${building.energyGrade}등급` },
              { name: '취약도 (20%)', score: building.scores.vulnerability, desc: `${BUILDING_TYPE_LABELS[building.type]} 이용 시설` },
              { name: '투자효율성 (20%)', score: building.scores.efficiency, desc: '예상 절감량 대비 투자비' },
              { name: '지역형평성 (10%)', score: building.scores.equity, desc: `${building.region} ${building.district}` },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}점</span>
                </div>
                <Progress value={item.score} className={`h-2 ${getScoreBg(item.score)}`} />
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <span className="font-medium">종합 우선순위 점수</span>
              <span className={`text-2xl font-bold ${getScoreColor(building.priorityScore)}`}>
                {building.priorityScore}점
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">다음 단계</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href={`/benchmarking?buildingId=${building.id}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <GitCompare className="h-4 w-4" />
                유사 사례 찾기
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/simulation/${building.id}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calculator className="h-4 w-4" />
                효과 시뮬레이션
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/checklist/${building.id}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ClipboardCheck className="h-4 w-4" />
                체크리스트 생성
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
