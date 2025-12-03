'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { SimulationForm, SimulationResult } from '@/components/simulation';
import { SimulationInput, SimulationResult as SimulationResultType } from '@/types';
import { remodelingItems } from '@/data/remodeling-items';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, RotateCcw } from 'lucide-react';

// 에너지 비용 (원/kWh)
const ENERGY_COST_PER_KWH = 120;
// CO2 배출 계수 (kgCO2/kWh)
const CO2_EMISSION_FACTOR = 0.4781;

function calculateSimulation(input: SimulationInput): SimulationResultType {
  const selectedItemsData = remodelingItems.filter((item) =>
    input.selectedItems.includes(item.id)
  );

  // 총 절감률 계산 (중복 효과 감쇄)
  let totalSavingRate = 0;
  let remainingEnergy = 100;

  selectedItemsData.forEach((item) => {
    const effectiveSaving = (item.energySavingRate / 100) * remainingEnergy;
    totalSavingRate += effectiveSaving;
    remainingEnergy -= effectiveSaving;
  });

  // 예상 EUI
  const expectedEUI = input.currentEUI * (1 - totalSavingRate / 100);

  // 연간 에너지 절감량 (kWh/년)
  const annualEnergySaving = (input.currentEUI - expectedEUI) * input.grossArea;

  // 연간 절감액
  const annualSaving = annualEnergySaving * ENERGY_COST_PER_KWH;

  // CO2 감축량 (tCO2/년)
  const co2Reduction = (annualEnergySaving * CO2_EMISSION_FACTOR) / 1000;

  // 총 비용
  const totalCost = selectedItemsData.reduce(
    (sum, item) => sum + item.costPerArea * input.grossArea,
    0
  );

  // m²당 비용
  const costPerArea = totalCost / input.grossArea;

  // 투자회수기간
  const paybackPeriod = annualSaving > 0 ? totalCost / annualSaving : 0;

  // 항목별 상세
  const itemBreakdown = selectedItemsData.map((item) => {
    const itemCost = item.costPerArea * input.grossArea;
    const itemSavingRate = item.energySavingRate;
    const itemEnergySaving = (item.energySavingRate / 100) * input.currentEUI * input.grossArea;
    const itemAnnualSaving = itemEnergySaving * ENERGY_COST_PER_KWH;

    return {
      itemId: item.id,
      name: item.name,
      cost: itemCost,
      savingRate: itemSavingRate,
      annualSaving: itemAnnualSaving,
    };
  });

  return {
    currentEUI: input.currentEUI,
    expectedEUI,
    energySavingRate: totalSavingRate,
    co2Reduction,
    annualSaving,
    totalCost,
    costPerArea,
    paybackPeriod,
    itemBreakdown,
  };
}

export default function SimulationPage() {
  const [result, setResult] = useState<SimulationResultType | null>(null);

  const handleSimulate = (input: SimulationInput) => {
    const simulationResult = calculateSimulation(input);
    setResult(simulationResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <AppLayout title="시뮬레이션">
      <div className="space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">리모델링 효과 시뮬레이션</h2>
                <p className="text-sm text-slate-500">
                  건물 정보와 리모델링 항목을 입력하면 예상 효과를 계산해 드립니다
                </p>
              </div>
            </div>
            {result && (
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                다시 시작
              </Button>
            )}
          </div>
        </Card>

        {/* Main Content */}
        {result ? (
          <SimulationResult result={result} />
        ) : (
          <SimulationForm onSimulate={handleSimulate} />
        )}
      </div>
    </AppLayout>
  );
}
