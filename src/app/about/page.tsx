'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Leaf,
  Building2,
  Target,
  Users,
  Zap,
  Search,
  Calculator,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Database,
  Globe,
  Award,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  const timeline = [
    { phase: '1단계', period: '6개월', title: '데이터 연계 체계 구축', desc: '프로토타입 개발', budget: '3억원' },
    { phase: '2단계', period: '6개월', title: '시범 지자체 적용', desc: '5개 지자체 피드백 반영', budget: '2억원' },
    { phase: '3단계', period: '12개월', title: '전국 확대', desc: 'AI 추천 고도화', budget: '5억원' },
  ];

  const priorityFactors = [
    { name: '건물 노후도', weight: '25%', desc: '준공연도, 에너지효율등급', color: 'from-blue-500 to-cyan-500' },
    { name: '에너지 다소비', weight: '25%', desc: '단위면적당 에너지사용량(EUI)', color: 'from-amber-500 to-orange-500' },
    { name: '이용자 취약도', weight: '20%', desc: '어린이, 노인, 환자 이용 비율', color: 'from-rose-500 to-pink-500' },
    { name: '투자 효율성', weight: '20%', desc: '예상 절감량 / 예상 사업비', color: 'from-emerald-500 to-teal-500' },
    { name: '지역 형평성', weight: '10%', desc: '지역별 기지원 이력', color: 'from-purple-500 to-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">GRDP</span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="/GRDP_제안서.pdf" download className="hidden sm:block">
                <Button variant="outline" size="sm" className="gap-2 border-slate-700 text-slate-300 hover:bg-white/5">
                  <Download className="h-4 w-4" />
                  제안서 다운로드
                </Button>
              </a>
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 gap-2 border-0">
                  플랫폼 시작
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 dark-pattern opacity-50" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>

          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Sparkles className="h-3 w-3 mr-2" />
            제5회 그린리모델링 챌린지 - 정책 아이디어 발굴 부문
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-gradient">프로젝트 소개</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl">
            GRDP(Green Remodeling Decision Platform)는 지자체 담당자가 데이터 기반으로
            그린리모델링 의사결정을 할 수 있도록 지원하는 통합 플랫폼입니다.
          </p>
        </div>
      </section>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-24">
        {/* 배경 및 문제점 */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10">배경 및 문제점</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8 bg-slate-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold">현황: 노후 건축물 vs 지원 실적</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">전국 노후 건축물 (30년 이상)</span>
                    <span className="font-bold text-white">301만 7,299동</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-slate-500 to-slate-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">5년간 지원 실적</span>
                    <span className="font-bold text-red-400">3,470동 (0.1%)</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full" style={{ width: '1%' }} />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-slate-400 p-4 bg-slate-800/50 rounded-xl">
                현재 속도로는 2050 탄소중립 목표 달성이 어려우며, 그린리모델링 추진 속도를 획기적으로 높여야 합니다.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 bg-slate-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">현장의 핵심 문제점</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-300">담당자 업무 과부하</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    경리, 행정, 안전관리까지 1인 다역 수행. 그린리모델링 전문 지식 부족
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-300">정보 분산</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    3개 부처가 별도 시스템 운영. 동일 정보 중복 제출 비효율
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-300">사전조사-설계 연계성 저하</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    정보 누락으로 인한 재조사 → 시간/비용 낭비 → 사업 지연
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 솔루션: GRDP */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10">솔루션: GRDP 플랫폼</h2>

          {/* Paradigm Shift */}
          <div className="glass rounded-2xl p-8 mb-10 bg-slate-800/30">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">패러다임 전환</Badge>
              <h3 className="text-2xl font-bold">에너지 모니터링 중심에서 의사결정 지원 중심으로</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-500 text-center mb-4">기존 패러다임</h4>
                <div className="space-y-2">
                  {['에너지 모니터링 중심', '전문가 대상 서비스', '개별 건물 관리', '정보 분산'].map((text, i) => (
                    <div key={i} className="p-4 bg-slate-800/50 rounded-xl text-slate-400 text-center">{text}</div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-teal-400 text-center mb-4">GRDP 패러다임</h4>
                <div className="space-y-2">
                  {['의사결정 지원 중심', '실무 담당자 대상 서비스', '포트폴리오 관리', '정보 통합'].map((text, i) => (
                    <div key={i} className="p-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/10 border border-teal-500/30 rounded-xl text-teal-300 text-center font-medium">{text}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: '우선순위 자동 산정', desc: '5개 지표 기반 객관적 우선순위 자동 추천', color: 'from-blue-500 to-cyan-500' },
              { icon: Search, title: '유사 건물 벤치마킹', desc: '비슷한 건물 리모델링 사례 자동 매칭', color: 'from-amber-500 to-orange-500' },
              { icon: Calculator, title: '효과 시뮬레이션', desc: '리모델링 항목별 예상 효과 미리 계산', color: 'from-purple-500 to-pink-500' },
              { icon: ClipboardCheck, title: '체크리스트 자동 생성', desc: '건물 유형별 맞춤 사전조사 템플릿', color: 'from-rose-500 to-red-500' },
            ].map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-6 bg-slate-800/30 hover-lift group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 우선순위 산정 기준 */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10">우선순위 산정 기준</h2>

          <div className="glass rounded-2xl p-8 bg-slate-800/30">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {priorityFactors.map((factor, index) => (
                <div key={index} className="text-center p-6 bg-slate-800/50 rounded-xl hover-lift">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${factor.color} bg-clip-text text-transparent mb-2`}>
                    {factor.weight}
                  </div>
                  <h4 className="font-semibold text-white mb-1">{factor.name}</h4>
                  <p className="text-xs text-slate-500">{factor.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20">
              <p className="text-teal-300">
                <strong>핵심 특징:</strong> 이용자 취약도 지표(20%)를 반영하여 어린이·노인·환자 이용 시설이 자동으로 상위 우선순위에 배치됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 기대효과 */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10">기대효과</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, value: '50%', label: '의사결정 시간 단축', desc: '데이터 기반 우선순위 추천으로 담당자 업무 효율화', color: 'blue' },
              { icon: TrendingUp, value: '40%', label: '예산 최적화 향상', desc: '투자 대비 효과 높은 건물 선별로 예산 활용도 제고', color: 'emerald' },
              { icon: ClipboardCheck, value: '67%', label: '재수행률 감소', desc: '표준화된 체크리스트로 정보 누락 방지', color: 'amber' },
              { icon: Leaf, value: '10,000', label: 'tCO₂ 추가 감축', desc: '리모델링 가속화로 2030 NDC 목표 달성 기여', color: 'purple' },
            ].map((item, index) => (
              <div key={index} className={`glass rounded-2xl p-6 bg-gradient-to-br from-${item.color}-500/10 to-transparent hover-lift`}>
                <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center mb-4`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-400`} />
                </div>
                <div className={`text-4xl font-bold text-${item.color}-400 mb-2`}>{item.value}</div>
                <h4 className="font-semibold text-white">{item.label}</h4>
                <p className="text-sm text-slate-400 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 추진 로드맵 */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10">추진 로드맵</h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-500 to-cyan-500 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="glass rounded-2xl p-6 bg-slate-800/30 inline-block hover-lift">
                      <Badge className="mb-2 bg-teal-500/20 text-teal-400 border-teal-500/30">{item.phase}</Badge>
                      <h4 className="font-semibold text-lg text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="text-slate-500">{item.period}</span>
                        <span className="font-semibold text-teal-400">{item.budget}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 items-center justify-center text-white font-bold z-10 shadow-lg shadow-teal-500/30">
                    {index + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 기술 스택 */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10">기술 스택</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'Frontend', color: 'blue', items: ['Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS + shadcn/ui', 'Recharts, Leaflet'] },
              { icon: Database, title: '데이터 연계', color: 'emerald', items: ['PEIS (에너지소비량)', '건물에너지 통합DB', '건축물대장 정보', '기상/인구 데이터'] },
              { icon: Award, title: '핵심 알고리즘', color: 'amber', items: ['우선순위 자동 산정', '유사 건물 매칭 (유클리디안 거리)', '에너지 절감 예측', '투자회수기간 계산'] },
            ].map((stack, index) => (
              <div key={index} className="glass rounded-2xl p-6 bg-slate-800/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${stack.color}-500/20 flex items-center justify-center`}>
                    <stack.icon className={`h-6 w-6 text-${stack.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold">{stack.title}</h3>
                </div>
                <ul className="space-y-3">
                  {stack.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="absolute inset-0 dark-pattern opacity-50" />

          <div className="relative p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-6 animate-pulse-glow">
              <Building2 className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold mb-4">지금 바로 체험해보세요</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              500+ 건물 데이터와 50+ 벤치마킹 사례가 준비되어 있습니다
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 gap-2 text-lg px-8 py-6 rounded-xl border-0">
                  대시보드 바로가기
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="/GRDP_제안서.pdf" download>
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 rounded-xl border-slate-600 text-slate-300 hover:bg-white/5">
                  <Download className="h-5 w-5" />
                  제안서 다운로드
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white">GRDP</span>
                <span className="text-slate-500 ml-2">공공건축물 그린리모델링 의사결정 지원 플랫폼</span>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              제5회 그린리모델링 챌린지 - 정책 아이디어 발굴 부문 출품작
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-slate-600">
            주최: 국토교통부 | 주관: 국토안전관리원 | 후원: (사)대한건축학회
          </div>
        </div>
      </footer>
    </div>
  );
}
