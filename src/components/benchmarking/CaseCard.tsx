'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Calendar, Ruler, Zap, Leaf, ArrowRight } from 'lucide-react';
import { RemodelingCase, BUILDING_TYPE_LABELS } from '@/types';
import Link from 'next/link';

interface CaseCardProps {
  caseData: RemodelingCase;
  similarity?: number;
}

export function CaseCard({ caseData, similarity }: CaseCardProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {BUILDING_TYPE_LABELS[caseData.type]}
              </Badge>
              {similarity && (
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                  유사도 {Math.round(similarity * 100)}%
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-slate-900">{caseData.buildingName}</h3>
            <p className="text-sm text-slate-500">{caseData.region} {caseData.district}</p>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < caseData.review.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-slate-600">{caseData.yearBuilt}년 준공</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Ruler className="h-4 w-4 text-slate-400" />
            <span className="text-slate-600">{caseData.grossArea}㎡</span>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-wrap gap-1 mb-4">
          {caseData.items.slice(0, 3).map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
          {caseData.items.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{caseData.items.length - 3}
            </Badge>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg mb-4">
          <div className="text-center">
            <Zap className="h-4 w-4 mx-auto text-amber-500 mb-1" />
            <p className="text-lg font-bold text-slate-900">{caseData.energySavingRate}%</p>
            <p className="text-xs text-slate-500">에너지 절감</p>
          </div>
          <div className="text-center">
            <Leaf className="h-4 w-4 mx-auto text-emerald-500 mb-1" />
            <p className="text-lg font-bold text-slate-900">{caseData.co2Reduction}</p>
            <p className="text-xs text-slate-500">tCO₂ 감축</p>
          </div>
          <div className="text-center">
            <span className="text-lg">💰</span>
            <p className="text-lg font-bold text-slate-900">{Math.round(caseData.totalCost / 10000000)}천만</p>
            <p className="text-xs text-slate-500">사업비</p>
          </div>
        </div>

        {/* Action */}
        <Link href={`/benchmarking/${caseData.id}`}>
          <Button variant="outline" className="w-full gap-2">
            상세 보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
