'use client';

import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { BuildingDetail } from '@/components/priority';
import { getBuildingById } from '@/data/buildings';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BuildingDetailPage() {
  const params = useParams();
  const buildingId = params.id as string;
  const building = getBuildingById(buildingId);

  if (!building) {
    return (
      <AppLayout title="건물 상세">
        <Card className="border-0 shadow-sm p-8 text-center">
          <p className="text-lg font-medium text-slate-600">건물을 찾을 수 없습니다</p>
          <Link href="/priority">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Button>
          </Link>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="건물 상세 분석">
      <div className="mb-4">
        <Link href="/priority">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </Link>
      </div>
      <BuildingDetail building={building} />
    </AppLayout>
  );
}
