'use client';

import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { CaseDetail } from '@/components/benchmarking';
import { remodelingCases } from '@/data/remodeling-cases';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.id as string;
  const caseData = remodelingCases.find((c) => c.id === caseId);

  if (!caseData) {
    return (
      <AppLayout title="사례 상세">
        <Card className="border-0 shadow-sm p-8 text-center">
          <p className="text-lg font-medium text-slate-600">사례를 찾을 수 없습니다</p>
          <Link href="/benchmarking">
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
    <AppLayout title="사례 상세 분석">
      <div className="mb-4">
        <Link href="/benchmarking">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </Link>
      </div>
      <CaseDetail caseData={caseData} />
    </AppLayout>
  );
}
