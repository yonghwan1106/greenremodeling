'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState, useRef, useCallback } from 'react';
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
  CheckCircle2,
  TrendingUp,
  Shield,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
} from 'lucide-react';

// 슬라이더 이미지 데이터 (Unsplash 무료 이미지)
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    title: '공공건축물',
    highlight: '그린리모델링',
    subtitle: '의사결정 지원 플랫폼',
    description: '데이터 기반으로 어떤 건물을 먼저, 어떻게 리모델링할지 결정하세요',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    title: '에너지 효율',
    highlight: '33.6% 절감',
    subtitle: '탄소중립 2050 달성',
    description: '그린리모델링으로 연간 10,000 tCO₂ 감축에 기여합니다',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
    title: '취약계층 시설',
    highlight: '우선 지원',
    subtitle: '경로당 · 어린이집 · 보건소',
    description: '고령화, 저출산, 지역소멸 문제와 그린리모델링을 연계합니다',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2074&auto=format&fit=crop',
    title: '스마트 분석',
    highlight: 'AI 기반 추천',
    subtitle: '5개 지표 자동 산정',
    description: '노후도, 에너지효율, 이용자 취약도 등을 종합 분석합니다',
  },
];

// 숫자 카운팅 애니메이션 컴포넌트
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, currentSlide]);

  // Auto-play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextSlide]);

  const features = [
    {
      icon: BarChart3,
      title: '대시보드',
      description: '관내 공공건축물 현황을 한눈에 파악하고 우선순위 건물을 실시간으로 모니터링',
      href: '/dashboard',
      gradient: 'from-blue-500 to-cyan-400',
      stats: '실시간 모니터링',
    },
    {
      icon: Target,
      title: '우선순위 분석',
      description: '노후도, 에너지효율, 이용자 취약도 등 5개 지표로 리모델링 우선순위 자동 산정',
      href: '/priority',
      gradient: 'from-teal-500 to-emerald-400',
      stats: '5개 지표 분석',
    },
    {
      icon: Search,
      title: '벤치마킹',
      description: '유사 건물의 리모델링 사례를 검색하고 성공요인, 비용, 효과를 비교',
      href: '/benchmarking',
      gradient: 'from-amber-500 to-orange-400',
      stats: '50+ 사례',
    },
    {
      icon: Calculator,
      title: '시뮬레이션',
      description: '리모델링 항목별 예상 효과를 미리 계산하여 최적의 투자 계획 수립',
      href: '/simulation',
      gradient: 'from-purple-500 to-pink-400',
      stats: '비용 예측',
    },
    {
      icon: ClipboardCheck,
      title: '체크리스트',
      description: '건물 유형별 맞춤 사전조사 체크리스트로 정보 누락 없이 효율적 조사',
      href: '/checklist',
      gradient: 'from-rose-500 to-red-400',
      stats: '템플릿 제공',
    },
  ];

  const stats = [
    { label: '등록 건물', value: 500, suffix: '+', icon: Building2 },
    { label: '평균 에너지 절감', value: 33.6, suffix: '%', icon: Zap },
    { label: '벤치마킹 사례', value: 50, suffix: '+', icon: Search },
    { label: 'CO₂ 감축 목표', value: 10000, suffix: '', prefix: '', icon: Leaf },
  ];

  const benefits = [
    { icon: Zap, text: '의사결정 시간 50% 단축', color: 'text-amber-400' },
    { icon: Leaf, text: '연간 10,000 tCO₂ 감축 기여', color: 'text-emerald-400' },
    { icon: Users, text: '취약계층 시설 우선 지원', color: 'text-cyan-400' },
  ];

  const techStack = [
    { name: 'AI 분석', icon: Sparkles },
    { name: '실시간 데이터', icon: TrendingUp },
    { name: '보안', icon: Shield },
    { name: '확장성', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section - Fullscreen Slider */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <Badge
                    className={`mb-6 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-4 py-2 transition-all duration-500 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <Sparkles className="h-3 w-3 mr-2" />
                    제5회 그린리모델링 챌린지 출품작
                  </Badge>

                  <h1
                    className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-500 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    <span className="block text-white">{slide.title}</span>
                    <span className="block mt-2 text-gradient glow-text">{slide.highlight}</span>
                    <span className="block mt-2 text-slate-300 text-4xl sm:text-5xl lg:text-6xl">{slide.subtitle}</span>
                  </h1>

                  <p
                    className={`mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl transition-all duration-500 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    {slide.description}
                  </p>

                  <div
                    className={`mt-10 flex flex-col sm:flex-row items-start gap-4 transition-all duration-500 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '500ms' }}
                  >
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white gap-2 text-lg px-8 py-6 rounded-xl hover-glow transition-all duration-300 border-0"
                      >
                        플랫폼 시작하기
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button
                        size="lg"
                        className="gap-2 text-lg px-8 py-6 rounded-xl bg-white/90 text-slate-900 hover:bg-white border-0 transition-all duration-300 font-semibold shadow-lg"
                      >
                        프로젝트 소개
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Progress Indicators */}
              <div className="flex items-center gap-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                  >
                    <div className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-12 bg-teal-500' : 'w-6 bg-white/30 hover:bg-white/50'
                    }`}>
                      {index === currentSlide && isPlaying && (
                        <div
                          className="absolute inset-0 bg-teal-300 rounded-full origin-left animate-progress"
                          style={{ animationDuration: '5s' }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Slide Counter & Download */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-white">0{currentSlide + 1}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-500">0{heroSlides.length}</span>
              </div>
              <a
                href="/GRDP_제안서.pdf"
                download
                className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                제안서 다운로드 (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden lg:block">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>

        {/* Side Gradient Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* Stats Section - Glass Cards */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 text-center hover-lift group bg-white border border-slate-200 shadow-lg"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                  {stat.label === 'CO₂ 감축 목표' && <span className="text-lg text-slate-600 ml-1">tCO₂</span>}
                </div>
                <div className="mt-2 text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="relative py-24">
        <div className="absolute inset-0 gradient-mesh-light opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800 text-teal-400 border-slate-700">
              핵심 기능
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              그린리모델링 의사결정의
              <br />
              <span className="text-gradient">모든 단계를 지원합니다</span>
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className={`group ${index === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="h-full rounded-2xl p-6 hover-lift transition-all duration-300 bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-xs font-medium">
                      {feature.stats}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    {feature.title}
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>

                  {/* Mini visualization for first card */}
                  {index === 0 && (
                    <div className="mt-6 flex gap-2">
                      {[40, 65, 45, 80, 55, 70, 50, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-teal-400 to-cyan-400 rounded-sm opacity-80"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Neon Glow */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-slate-900 to-cyan-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              기대 효과
            </h2>
            <p className="text-slate-400 text-lg">데이터 기반 의사결정으로 실현되는 가치</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-8 glass hover-glow transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${benefit.color}`}>
                  <benefit.icon className="h-8 w-8" />
                </div>

                <span className="text-2xl font-bold text-white">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-slate-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              공동체 문제해결
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              취약계층 시설 우선 지원
            </h2>
            <p className="text-slate-400 text-lg">
              경로당 · 어린이집 · 보건소 등 사회적 약자를 위한 시설을 우선 개선
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '👴👵', title: '고령화 대응', desc: '경로당 환경 개선으로 어르신 건강·쾌적성 향상', stat: '2024년 319동 지원', color: 'from-orange-500/20 to-amber-500/20' },
              { emoji: '👶', title: '저출산 대응', desc: '어린이집 실내공기질 개선으로 영유아 건강 환경 조성', stat: '2024년 55동 지원', color: 'from-pink-500/20 to-rose-500/20' },
              { emoji: '🏥', title: '지역소멸 대응', desc: '보건소 에너지비용 절감으로 의료서비스 품질 향상', stat: '2024년 154동 지원', color: 'from-blue-500/20 to-cyan-500/20' },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 bg-gradient-to-br ${item.color} border border-white/10 hover-lift`}
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{item.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-500">
                <tech.icon className="h-5 w-5" />
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />

        {/* Animated Grid */}
        <div className="absolute inset-0 dark-pattern opacity-50" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 animate-pulse-glow">
              <Building2 className="h-10 w-10 text-white" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            데이터 기반 의사결정으로 그린리모델링을 가속화하고
            <br className="hidden sm:block" />
            탄소중립 2050 목표 달성에 기여하세요
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white gap-2 text-lg px-10 py-7 rounded-xl hover-glow transition-all duration-300 border-0"
              >
                대시보드 바로가기
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="/GRDP_제안서.pdf" download>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-lg px-10 py-7 rounded-xl border-slate-600 text-slate-300 hover:bg-white/5"
              >
                <Download className="h-5 w-5" />
                제안서 다운로드
              </Button>
            </a>
          </div>
        </div>
      </section>

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

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </div>
  );
}
