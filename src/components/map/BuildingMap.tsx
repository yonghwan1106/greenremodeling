'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, STATUS_COLORS, BUILDING_TYPE_LABELS } from '@/types';

interface BuildingMapProps {
  buildings: Building[];
  height?: string;
}

export function BuildingMap({ buildings, height = '400px' }: BuildingMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">건물 위치 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ height }}
            className="flex items-center justify-center rounded-lg bg-slate-100"
          >
            <span className="text-slate-500">지도 로딩 중...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <BuildingMapClient buildings={buildings} height={height} />;
}

// 클라이언트 전용 컴포넌트
function BuildingMapClient({ buildings, height }: BuildingMapProps) {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [CircleMarker, setCircleMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);

  useEffect(() => {
    // 동적 import
    import('react-leaflet').then((mod) => {
      setMapContainer(() => mod.MapContainer);
      setTileLayer(() => mod.TileLayer);
      setCircleMarker(() => mod.CircleMarker);
      setPopup(() => mod.Popup);
    });

    // Leaflet CSS - 스타일시트 동적 삽입
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }, []);

  if (!MapContainer || !TileLayer || !CircleMarker || !Popup) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">건물 위치 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ height }}
            className="flex items-center justify-center rounded-lg bg-slate-100"
          >
            <span className="text-slate-500">지도 로딩 중...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getMarkerColor = (status: Building['status'], priorityScore: number) => {
    if (status === 'completed') return '#10b981';
    if (status === 'in_progress') return '#3b82f6';
    if (priorityScore >= 80) return '#ef4444';
    if (priorityScore >= 60) return '#f59e0b';
    return '#6b7280';
  };

  // 대한민국 중심 좌표
  const center: [number, number] = [36.5, 127.5];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">건물 위치 현황</CardTitle>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span>긴급</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-amber-500"></span>
            <span>주의</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <span>진행중</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
            <span>완료</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height }} className="rounded-lg overflow-hidden">
          <MapContainer
            center={center}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buildings.map((building) => (
              <CircleMarker
                key={building.id}
                center={building.coordinates}
                radius={6}
                pathOptions={{
                  color: getMarkerColor(building.status, building.priorityScore),
                  fillColor: getMarkerColor(building.status, building.priorityScore),
                  fillOpacity: 0.8,
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-bold text-slate-900">{building.name}</h3>
                    <p className="text-sm text-slate-600">{BUILDING_TYPE_LABELS[building.type]}</p>
                    <p className="text-sm text-slate-500">{building.address}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm">우선순위 점수</span>
                      <span className="font-bold text-emerald-600">{building.priorityScore}점</span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
