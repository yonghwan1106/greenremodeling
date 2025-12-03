'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Building, BUILDING_TYPE_LABELS, BuildingType } from '@/types';

interface BuildingTypeChartProps {
  buildings: Building[];
}

const COLORS = {
  senior_center: '#10b981',
  daycare: '#3b82f6',
  health_center: '#8b5cf6',
};

export function BuildingTypeChart({ buildings }: BuildingTypeChartProps) {
  const typeCount = buildings.reduce((acc, building) => {
    acc[building.type] = (acc[building.type] || 0) + 1;
    return acc;
  }, {} as Record<BuildingType, number>);

  const data = Object.entries(typeCount).map(([type, count]) => ({
    name: BUILDING_TYPE_LABELS[type as BuildingType],
    value: count,
    type: type as BuildingType,
  }));

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">건물 유형별 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.type]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}동`, '건물 수']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
