'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Star,
  Calendar,
  Ruler,
  Clock,
  MapPin,
  Zap,
  Leaf,
  Wallet,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import { RemodelingCase, BUILDING_TYPE_LABELS } from '@/types';

interface CaseDetailProps {
  caseData: RemodelingCase;
}

export function CaseDetail({ caseData }: CaseDetailProps) {
  const euiData = [
    { name: '리모델링 전', value: caseData.beforeEUI, color: '#ef4444' },
    { name: '리모델링 후', value: caseData.afterEUI, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{BUILDING_TYPE_LABELS[caseData.type]}</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">완료</Badge>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{caseData.buildingName}</h2>
              <p className="flex items-center gap-1 text-slate-500 mt-1">
                <MapPin className="h-4 w-4" />
                {caseData.region} {caseData.district}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < caseData.review.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">준공연도</p>
                <p className="font-semibold">{caseData.yearBuilt}년</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Ruler className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">연면적</p>
                <p className="font-semibold">{caseData.grossArea}㎡</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">완료일</p>
                <p className="font-semibold">{caseData.completedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Clock className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">공사기간</p>
                <p className="font-semibold">{caseData.constructionPeriod}일</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Remodeling Items */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">리모델링 항목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {caseData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">총 사업비</span>
                <span className="font-bold">{(caseData.totalCost / 100000000).toFixed(1)}억원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">단위면적당 비용</span>
                <span className="font-bold">{Math.round(caseData.totalCost / caseData.grossArea).toLocaleString()}원/㎡</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EUI Comparison */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">에너지 성능 비교</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={euiData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 'auto']} unit=" kWh/㎡" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value} kWh/㎡`, 'EUI']} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {euiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-center">
              <span className="text-2xl font-bold text-emerald-600">{caseData.energySavingRate}%</span>
              <p className="text-sm text-emerald-700">에너지 절감률</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">리모델링 효과</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-amber-50">
              <Zap className="h-8 w-8 mx-auto text-amber-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">{caseData.energySavingRate}%</p>
              <p className="text-sm text-slate-600">에너지 절감률</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-emerald-50">
              <Leaf className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">{caseData.co2Reduction}</p>
              <p className="text-sm text-slate-600">tCO₂/년 감축</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <Wallet className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">{(caseData.costSaving / 10000).toFixed(0)}만</p>
              <p className="text-sm text-slate-600">원/년 절감</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <Clock className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">{(caseData.totalCost / caseData.costSaving).toFixed(1)}</p>
              <p className="text-sm text-slate-600">년 투자회수</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">담당자 후기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-emerald-50 border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="font-medium text-emerald-800">성공 요인</span>
            </div>
            <p className="text-sm text-slate-700">{caseData.review.successFactors}</p>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 border-l-4 border-amber-500">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-800">애로사항</span>
            </div>
            <p className="text-sm text-slate-700">{caseData.review.challenges}</p>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">팁</span>
            </div>
            <p className="text-sm text-slate-700">{caseData.review.tips}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
