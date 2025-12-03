'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Building, BUILDING_TYPE_LABELS } from '@/types';

interface PriorityListProps {
  buildings: Building[];
}

export function PriorityList({ buildings }: PriorityListProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">우선순위 TOP 5</CardTitle>
        <Link href="/priority">
          <Button variant="ghost" size="sm" className="gap-1 text-emerald-600 hover:text-emerald-700">
            전체 보기 <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {buildings.slice(0, 5).map((building, index) => (
            <Link
              key={building.id}
              href={`/priority/${building.id}`}
              className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-slate-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900 truncate">
                    {building.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {BUILDING_TYPE_LABELS[building.type]}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 truncate">
                  {building.region} {building.district}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">
                  {building.priorityScore}점
                </div>
                <div className="text-xs text-slate-500">종합점수</div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
