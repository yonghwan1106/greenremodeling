'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Building2,
  Search,
  Calculator,
  ClipboardCheck,
  ArrowRight,
  Leaf,
  Users,
  Zap,
  Target,
  Download,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BarChart3,
      title: '대시보드',
      description: '관내 공공건축물 현황을 한눈에 파악하고 우선순위 건물을 실시간으로 모니터링합니다.',
      href: '/dashboard',
      color: 'bg-blue-500',
    },
    {
      icon: Target,
      title: '우선순위 분석',
      description: '노후도, 에너지효율, 이용자 취약도 등 5개 지표로 리모델링 우선순위를 자동 산정합니다.',
      href: '/priority',
      color: 'bg-emerald-500',
    },
    {
      icon: Search,
      title: '벤치마킹',
      description: '유사 건물의 리모델링 사례를 검색하고 성공요인, 비용, 효과를 비교합니다.',
      href: '/benchmarking',
      color: 'bg-amber-500',
    },
    {
      icon: Calculator,
      title: '시뮬레이션',
      description: '리모델링 항목별 예상 효과를 미리 계산하여 최적의 투자 계획을 수립합니다.',
      href: '/simulation',
      color: 'bg-purple-500',
    },
    {
      icon: ClipboardCheck,
      title: '체크리스트',
      description: '건물 유형별 맞춤 사전조사 체크리스트로 정보 누락 없이 효율적으로 조사합니다.',
      href: '/checklist',
      color: 'bg-rose-500',
    },
  ];

  const stats = [
    { label: '등록 건물', value: '500+', unit: '동' },
    { label: '평균 에너지 절감', value: '33.6', unit: '%' },
    { label: '벤치마킹 사례', value: '50+', unit: '건' },
    { label: 'CO₂ 감축 목표', value: '10,000', unit: 'tCO₂' },
  ];

  const benefits = [
    { icon: Zap, text: '의사결정 시간 50% 단축' },
    { icon: Leaf, text: '연간 10,000 tCO₂ 감축 기여' },
    { icon: Users, text: '취약계층 시설 우선 지원' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              제5회 그린리모델링 챌린지 출품작
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
              공공건축물
              <span className="text-emerald-600"> 그린리모델링</span>
              <br />
              의사결정 지원 플랫폼
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              지자체 담당자가 관내 공공건축물 중 <strong>"어떤 건물을 먼저, 어떻게 리모델링할지"</strong>
              <br className="hidden sm:block" />
              데이터 기반으로 의사결정할 수 있도록 지원합니다.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-lg px-8">
                  플랫폼 시작하기
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  프로젝트 소개
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-6">
              <a
                href="/GRDP_제안서.pdf"
                download
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Download className="h-4 w-4" />
                제안서 다운로드 (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600">
                  {stat.value}
                  <span className="text-lg text-slate-500 ml-1">{stat.unit}</span>
                </div>
                <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              핵심 기능
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              그린리모델링 의사결정의 모든 단계를 지원합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      {feature.title}
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              기대 효과
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              공동체 문제해결과 그린리모델링의 연계
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              경로당·어린이집·보건소 등 취약계층 이용시설 우선 지원
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👴👵</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">고령화 대응</h3>
                <p className="text-slate-600 mb-4">경로당 환경 개선으로 어르신 건강·쾌적성 향상</p>
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>2024년 319동 지원</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-pink-50 to-white">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👶</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">저출산 대응</h3>
                <p className="text-slate-600 mb-4">어린이집 실내공기질 개선으로 영유아 건강 환경 조성</p>
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>2024년 55동 지원</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">지역소멸 대응</h3>
                <p className="text-slate-600 mb-4">보건소 에너지비용 절감으로 의료서비스 품질 향상</p>
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>2024년 154동 지원</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            데이터 기반 의사결정으로 그린리모델링을 가속화하세요
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-lg px-8">
                대시보드 바로가기
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="/GRDP_제안서.pdf" download>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 border-slate-600 text-slate-300 hover:bg-slate-800">
                <Download className="h-5 w-5" />
                제안서 다운로드
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-50 border-t border-slate-200">
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
        </div>
      </footer>

      {/* Hidden Contest Info (SEO/Meta) */}
      <div className="sr-only" aria-hidden="true">
        <p>
          본 플랫폼은 국토교통부 주최, 국토안전관리원 주관 제5회 그린리모델링 챌린지
          정책 아이디어 발굴 부문 출품작입니다. 세부주제: 고령화, 저출산, 지역소멸 등
          공동체 문제해결과 그린리모델링을 연계할 수 있는 정책
        </p>
      </div>
    </div>
  );
}
