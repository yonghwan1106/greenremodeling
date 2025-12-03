'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { remodelingItems } from '@/data/remodeling-items';
import { BuildingType, BUILDING_TYPE_LABELS, SimulationInput } from '@/types';
import { Building2, Ruler, Zap, Calendar } from 'lucide-react';

interface SimulationFormProps {
  onSimulate: (input: SimulationInput) => void;
}

export function SimulationForm({ onSimulate }: SimulationFormProps) {
  const [buildingType, setBuildingType] = useState<BuildingType>('senior_center');
  const [grossArea, setGrossArea] = useState<number>(500);
  const [yearBuilt, setYearBuilt] = useState<number>(1990);
  const [currentEUI, setCurrentEUI] = useState<number>(300);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSubmit = () => {
    onSimulate({
      buildingType,
      grossArea,
      yearBuilt,
      currentEUI,
      selectedItems,
    });
  };

  const groupedItems = {
    passive: remodelingItems.filter((item) => item.category === 'passive'),
    active: remodelingItems.filter((item) => item.category === 'active'),
    renewable: remodelingItems.filter((item) => item.category === 'renewable'),
  };

  return (
    <div className="space-y-6">
      {/* Building Info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-600" />
            건물 정보 입력
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="buildingType">건물 유형</Label>
              <Select
                value={buildingType}
                onValueChange={(value) => setBuildingType(value as BuildingType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="건물 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BUILDING_TYPE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                준공연도
              </Label>
              <Input
                id="yearBuilt"
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(Number(e.target.value))}
                min={1960}
                max={2024}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grossArea" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                연면적 (m²)
              </Label>
              <Input
                id="grossArea"
                type="number"
                value={grossArea}
                onChange={(e) => setGrossArea(Number(e.target.value))}
                min={100}
                max={10000}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentEUI" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                현재 EUI (kWh/m²·년)
              </Label>
              <div className="space-y-3">
                <Slider
                  value={[currentEUI]}
                  onValueChange={(value) => setCurrentEUI(value[0])}
                  min={100}
                  max={500}
                  step={10}
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>100 (효율적)</span>
                  <span className="font-medium text-slate-700">{currentEUI} kWh/m²</span>
                  <span>500 (비효율적)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remodeling Items Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">리모델링 항목 선택</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Passive Items */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              패시브 (단열·기밀)
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              {groupedItems.passive.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedItems.includes(item.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleItemToggle(item.id)}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemToggle(item.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      약 {item.energySavingRate}% 절감 · {(item.costPerArea / 10000).toFixed(0)}만원/m²
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Items */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              액티브 (설비)
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              {groupedItems.active.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedItems.includes(item.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleItemToggle(item.id)}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemToggle(item.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      약 {item.energySavingRate}% 절감 · {(item.costPerArea / 10000).toFixed(0)}만원/m²
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Renewable Items */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              신재생에너지
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              {groupedItems.renewable.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedItems.includes(item.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleItemToggle(item.id)}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemToggle(item.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      약 {item.energySavingRate}% 절감 · {(item.costPerArea / 10000).toFixed(0)}만원/m²
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-slate-600">
              선택된 항목: <span className="font-semibold">{selectedItems.length}개</span>
            </p>
            <Button
              onClick={handleSubmit}
              disabled={selectedItems.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              시뮬레이션 실행
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
