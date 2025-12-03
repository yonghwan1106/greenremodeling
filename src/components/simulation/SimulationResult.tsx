'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import {
  Zap,
  Leaf,
  Wallet,
  Clock,
  TrendingDown,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react';
import { SimulationResult as SimulationResultType } from '@/types';
import { remodelingItems } from '@/data/remodeling-items';

interface SimulationResultProps {
  result: SimulationResultType;
}

export function SimulationResult({ result }: SimulationResultProps) {
  const euiData = [
    { name: '현재', value: result.currentEUI, color: '#ef4444' },
    { name: '예상', value: result.expectedEUI, color: '#10b981' },
  ];

  const costBreakdown = result.itemBreakdown.map((item) => ({
    name: item.name.length > 8 ? item.name.slice(0, 8) + '...' : item.name,
    fullName: item.name,
    cost: item.cost / 100000000,
    saving: item.annualSaving / 10000,
  }));

  const categoryData = [
    {
      name: '패시브',
      value: result.itemBreakdown
        .filter((item) => {
          const fullItem = remodelingItems.find((i) => i.id === item.itemId);
          return fullItem?.category === 'passive';
        })
        .reduce((sum, item) => sum + item.cost, 0),
      color: '#3b82f6',
    },
    {
      name: '액티브',
      value: result.itemBreakdown
        .filter((item) => {
          const fullItem = remodelingItems.find((i) => i.id === item.itemId);
          return fullItem?.category === 'active';
        })
        .reduce((sum, item) => sum + item.cost, 0),
      color: '#f59e0b',
    },
    {
      name: '신재생',
      value: result.itemBreakdown
        .filter((item) => {
          const fullItem = remodelingItems.find((i) => i.id === item.itemId);
          return fullItem?.category === 'renewable';
        })
        .reduce((sum, item) => sum + item.cost, 0),
      color: '#10b981',
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Zap className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-700">에너지 절감률</p>
                <p className="text-2xl font-bold text-amber-900">
                  {result.energySavingRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-emerald-700">CO₂ 감축량</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {result.co2Reduction.toFixed(1)} tCO₂/년
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700">연간 절감액</p>
                <p className="text-2xl font-bold text-blue-900">
                  {(result.annualSaving / 10000).toFixed(0)}만원
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-700">투자회수기간</p>
                <p className="text-2xl font-bold text-purple-900">
                  {result.paybackPeriod.toFixed(1)}년
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* EUI Comparison */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
              EUI 비교
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={euiData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 'auto']} unit=" kWh/m²" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip formatter={(value) => [`${value} kWh/m²`, 'EUI']} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {euiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <ArrowDown className="h-5 w-5 text-emerald-600" />
                <span className="text-lg font-bold text-emerald-700">
                  {(result.currentEUI - result.expectedEUI).toFixed(0)} kWh/m² 절감
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost by Category */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">카테고리별 비용 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `${(value / 100000000).toFixed(1)}억원`,
                      '비용',
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Cost Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">총 사업비 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-sm text-slate-600">총 사업비</p>
              <p className="text-2xl font-bold text-slate-900">
                {(result.totalCost / 100000000).toFixed(1)}억원
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-sm text-slate-600">m²당 비용</p>
              <p className="text-2xl font-bold text-slate-900">
                {Math.round(result.costPerArea).toLocaleString()}원
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50">
              <p className="text-sm text-emerald-600">30년 순 절감액</p>
              <p className="text-2xl font-bold text-emerald-700">
                {((result.annualSaving * 30 - result.totalCost) / 100000000).toFixed(1)}억원
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Item Breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">항목별 상세</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.itemBreakdown.map((item, index) => {
              const fullItem = remodelingItems.find((i) => i.id === item.itemId);
              return (
                <div key={index} className="p-4 rounded-lg bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {fullItem?.category === 'passive'
                          ? '패시브'
                          : fullItem?.category === 'active'
                          ? '액티브'
                          : '신재생'}
                      </Badge>
                    </div>
                    <span className="font-semibold">
                      {(item.cost / 100000000).toFixed(2)}억원
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">절감률</p>
                      <p className="font-medium">{item.savingRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500">연간 절감액</p>
                      <p className="font-medium text-emerald-600">
                        {(item.annualSaving / 10000).toFixed(0)}만원
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">개별 회수기간</p>
                      <p className="font-medium">{(item.cost / item.annualSaving).toFixed(1)}년</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
