'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, BuildingType, BUILDING_TYPE_LABELS } from '@/types';
import { buildings } from '@/data/buildings';
import { Building2, Users, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface ChecklistSelectorProps {
  onSelectBuilding: (building: Building) => void;
}

export function ChecklistSelector({ onSelectBuilding }: ChecklistSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<BuildingType | 'all'>('all');

  const filteredBuildings = buildings
    .filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || b.type === selectedType;
      return matchesSearch && matchesType;
    })
    .slice(0, 20);

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-600" />
            건물 선택
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="건물명 또는 주소 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select
              value={selectedType}
              onValueChange={(value) => setSelectedType(value as BuildingType | 'all')}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="건물 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 유형</SelectItem>
                {Object.entries(BUILDING_TYPE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredBuildings.map((building) => (
              <div
                key={building.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer transition-colors"
                onClick={() => onSelectBuilding(building)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Building2 className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{building.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {BUILDING_TYPE_LABELS[building.type]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {building.region} {building.district}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        일 {building.dailyUsers}명
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </div>
            ))}
          </div>

          {filteredBuildings.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              검색 결과가 없습니다
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
