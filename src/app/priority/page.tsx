'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { BuildingTable, BuildingDetail } from '@/components/priority';
import { buildings } from '@/data/buildings';
import { Building } from '@/types';
import { Card } from '@/components/ui/card';

export default function PriorityPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  return (
    <AppLayout title="우선순위 분석">
      <div className="grid gap-6 xl:grid-cols-5">
        {/* Building Table */}
        <div className="xl:col-span-3">
          <Card className="border-0 shadow-sm p-4">
            <BuildingTable
              buildings={buildings}
              onSelectBuilding={setSelectedBuilding}
            />
          </Card>
        </div>

        {/* Building Detail */}
        <div className="xl:col-span-2">
          {selectedBuilding ? (
            <BuildingDetail building={selectedBuilding} />
          ) : (
            <Card className="border-0 shadow-sm p-8 text-center">
              <div className="text-slate-400">
                <p className="text-lg font-medium">건물을 선택하세요</p>
                <p className="text-sm mt-1">목록에서 건물을 클릭하면 상세 분석을 볼 수 있습니다</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
