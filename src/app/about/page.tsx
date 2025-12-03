'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Leaf,
  Building2,
  Target,
  Users,
  Zap,
  BarChart3,
  Search,
  Calculator,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Database,
  Globe,
  Award,
} from 'lucide-react';

export default function AboutPage() {
  const timeline = [
    { phase: '1단계', period: '6개월', title: '데이터 연계 체계 구축', desc: '프로토타입 개발', budget: '3억원' },
    { phase: '2단계', period: '6개월', title: '시범 지자체 적용', desc: '5개 지자체 피드백 반영', budget: '2억원' },
    { phase: '3단계', period: '12개월', title: '전국 확대', desc: 'AI 추천 고도화', budget: '5억원' },
  ];

  const priorityFactors = [
    { name: '건물 노후도', weight: '25%', desc: '준공연도, 에너지효율등급' },
    { name: '에너지 다소비', weight: '25%', desc: '단위면적당 에너지사용량(EUI)' },
    { name: '이용자 취약도', weight: '20%', desc: '어린이, 노인, 환자 이용 비율' },
    { name: '투자 효율성', weight: '20%', desc: '예상 절감량 / 예상 사업비' },
    { name: '지역 형평성', weight: '10%', desc: '지역별 기지원 이력' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-xl text-slate-900">GRDP</span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="/GRDP_제안서.pdf" download>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  제안서 다운로드
                </Button>
              </a>
              <Link href="/dashboard">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  플랫폼 시작
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
            제5회 그린리모델링 챌린지 - 정책 아이디어 발굴 부문
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            프로젝트 소개
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            GRDP(Green Remodeling Decision Platform)는 지자체 담당자가 데이터 기반으로
            그린리모델링 의사결정을 할 수 있도록 지원하는 통합 플랫폼입니다.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 배경 및 문제점 */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">배경 및 문제점</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  현황: 노후 건축물 vs 지원 실적
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-600">전국 노후 건축물 (30년 이상)</span>
                      <span className="font-semibold">301만 7,299동</span>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-600">5년간 지원 실적</span>
                      <span className="font-semibold text-red-500">3,470동 (0.1%)</span>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '0.5%' }} />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  현재 속도로는 2050 탄소중립 목표 달성이 어려우며, 그린리모델링 추진 속도를 획기적으로 높여야 합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  현장의 핵심 문제점
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800">담당자 업무 과부하</h4>
                  <p className="text-sm text-red-700 mt-1">
                    경리, 행정, 안전관리까지 1인 다역 수행. 그린리모델링 전문 지식 부족
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-800">정보 분산</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    3개 부처가 별도 시스템 운영. 동일 정보 중복 제출 비효율
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800">사전조사-설계 연계성 저하</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    정보 누락으로 인한 재조사 → 시간/비용 낭비 → 사업 지연
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 솔루션: GRDP */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">솔루션: GRDP 플랫폼</h2>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">패러다임 전환</h3>
              <p className="text-slate-600">에너지 모니터링 중심에서 의사결정 지원 중심으로</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-500">기존 패러다임</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-600">에너지 <strong>모니터링</strong> 중심</div>
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-600"><strong>전문가</strong> 대상 서비스</div>
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-600"><strong>개별 건물</strong> 관리</div>
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-600">정보 <strong>분산</strong></div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-emerald-600">GRDP 패러다임</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200"><strong>의사결정 지원</strong> 중심</div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200"><strong>실무 담당자</strong> 대상 서비스</div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200"><strong>포트폴리오</strong> 관리</div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200">정보 <strong>통합</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">우선순위 자동 산정</h3>
                <p className="text-sm text-slate-600">5개 지표 기반 객관적 우선순위 자동 추천</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">유사 건물 벤치마킹</h3>
                <p className="text-sm text-slate-600">비슷한 건물 리모델링 사례 자동 매칭</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">효과 시뮬레이션</h3>
                <p className="text-sm text-slate-600">리모델링 항목별 예상 효과 미리 계산</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">체크리스트 자동 생성</h3>
                <p className="text-sm text-slate-600">건물 유형별 맞춤 사전조사 템플릿</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 우선순위 산정 기준 */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">우선순위 산정 기준</h2>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-5 gap-4">
                {priorityFactors.map((factor, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">{factor.weight}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{factor.name}</h4>
                    <p className="text-xs text-slate-500">{factor.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                <p className="text-sm text-emerald-700">
                  <strong>핵심 특징:</strong> 이용자 취약도 지표(20%)를 반영하여 어린이·노인·환자 이용 시설이 자동으로 상위 우선순위에 배치됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 기대효과 */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">기대효과</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-6 text-center">
                <Clock className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-1">50%</div>
                <h4 className="font-semibold text-slate-900">의사결정 시간 단축</h4>
                <p className="text-sm text-slate-500 mt-2">데이터 기반 우선순위 추천으로 담당자 업무 효율화</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-emerald-600 mb-1">40%</div>
                <h4 className="font-semibold text-slate-900">예산 최적화 향상</h4>
                <p className="text-sm text-slate-500 mt-2">투자 대비 효과 높은 건물 선별로 예산 활용도 제고</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="pt-6 text-center">
                <ClipboardCheck className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-amber-600 mb-1">67%</div>
                <h4 className="font-semibold text-slate-900">재수행률 감소</h4>
                <p className="text-sm text-slate-500 mt-2">표준화된 체크리스트로 정보 누락 방지</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6 text-center">
                <Leaf className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-1">10,000</div>
                <h4 className="font-semibold text-slate-900">tCO₂ 추가 감축</h4>
                <p className="text-sm text-slate-500 mt-2">리모델링 가속화로 2030 NDC 목표 달성 기여</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 추진 로드맵 */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">추진 로드맵</h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <Card className="border-0 shadow-sm inline-block">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-emerald-100 text-emerald-700">{item.phase}</Badge>
                        <h4 className="font-semibold text-lg text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="text-slate-500">{item.period}</span>
                          <span className="font-semibold text-emerald-600">{item.budget}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-emerald-500 items-center justify-center text-white font-bold z-10">
                    {index + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* 기술 스택 */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">기술 스택</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Next.js 15 (App Router)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />TypeScript</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Tailwind CSS + shadcn/ui</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Recharts, Leaflet</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-500" />
                  데이터 연계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />PEIS (에너지소비량)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />건물에너지 통합DB</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />건축물대장 정보</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />기상/인구 데이터</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  핵심 알고리즘
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />우선순위 자동 산정</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />유사 건물 매칭 (유클리디안 거리)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />에너지 절감 예측</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />투자회수기간 계산</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-600 rounded-2xl p-8 text-center text-white">
          <Building2 className="h-12 w-12 mx-auto mb-4 text-emerald-200" />
          <h2 className="text-2xl font-bold mb-2">지금 바로 체험해보세요</h2>
          <p className="text-emerald-100 mb-6">500+ 건물 데이터와 50+ 벤치마킹 사례가 준비되어 있습니다</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 gap-2">
                대시보드 바로가기
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="/GRDP_제안서.pdf" download>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-500 gap-2">
                <Download className="h-5 w-5" />
                제안서 다운로드
              </Button>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold text-slate-900">GRDP</span>
              <span className="text-slate-500">공공건축물 그린리모델링 의사결정 지원 플랫폼</span>
            </div>
            <div className="text-sm text-slate-500">
              제5회 그린리모델링 챌린지 - 정책 아이디어 발굴 부문 출품작
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-slate-400">
            주최: 국토교통부 | 주관: 국토안전관리원 | 후원: (사)대한건축학회
          </div>
        </div>
      </footer>
    </div>
  );
}
