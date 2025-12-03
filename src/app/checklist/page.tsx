'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { ChecklistSelector, ChecklistForm } from '@/components/checklist';
import { Building } from '@/types';
import { Card } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export default function ChecklistPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  return (
    <AppLayout title="체크리스트">
      <div className="space-y-6">
        {/* Header */}
        {!selectedBuilding && (
          <Card className="border-0 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <ClipboardCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">사전조사 체크리스트</h2>
                <p className="text-sm text-slate-500">
                  건물을 선택하면 해당 건물 유형에 맞는 체크리스트가 표시됩니다
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        {selectedBuilding ? (
          <ChecklistForm
            building={selectedBuilding}
            onBack={() => setSelectedBuilding(null)}
          />
        ) : (
          <ChecklistSelector onSelectBuilding={setSelectedBuilding} />
        )}
      </div>
    </AppLayout>
  );
}
