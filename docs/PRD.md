# GRDP - Product Requirements Document (PRD)

## 1. 제품 개요

### 1.1 제품명
**GRDP (Green Remodeling Decision Platform)**
공공건축물 그린리모델링 의사결정 지원 플랫폼

### 1.2 제품 비전
지자체 담당자가 관내 공공건축물 중 "어떤 건물을 먼저, 어떻게 리모델링할지" 데이터 기반으로 의사결정할 수 있도록 지원하는 통합 플랫폼

### 1.3 목표 사용자
- **주 사용자**: 지자체 공공건축물 관리 담당자 (시설관리팀, 건축과 등)
- **부 사용자**: 그린리모델링 사업 담당 공무원, 정책 기획자

### 1.4 핵심 가치 제안
1. **의사결정 시간 50% 단축**: 분산된 정보를 통합하여 한눈에 파악
2. **예산 최적화 40% 향상**: 데이터 기반 우선순위로 투자 효율 극대화
3. **공동체 문제해결 연계**: 취약계층 이용시설(경로당/어린이집/보건소) 우선 지원

---

## 2. 기능 요구사항

### 2.1 대시보드 (Dashboard)

#### 2.1.1 개요
담당자가 로그인 후 처음 보는 화면. 관할 지역의 그린리모델링 현황을 한눈에 파악.

#### 2.1.2 기능 상세

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 통계 카드 | 관리 건물 수, 리모델링 완료, 진행 중, 긴급 대상 | P0 |
| 우선순위 TOP 5 | 리모델링 우선순위 상위 5개 건물 미리보기 | P0 |
| 지역 지도 | Leaflet 기반 건물 위치 표시, 상태별 색상 구분 | P0 |
| 최근 알림 | 사업 일정, 마감 알림, 시스템 공지 | P1 |
| 에너지 현황 | 전체 에너지 소비량 추이 차트 | P1 |
| 빠른 작업 | 자주 사용하는 기능 바로가기 버튼 | P2 |

#### 2.1.3 UI 요구사항
- 반응형 그리드 레이아웃 (4열 → 2열 → 1열)
- 다크/라이트 모드 지원
- 카드형 위젯 구조

---

### 2.2 우선순위 분석 (Priority Analysis)

#### 2.2.1 개요
관내 모든 공공건축물의 그린리모델링 우선순위를 자동 산정하고 분석하는 핵심 기능.

#### 2.2.2 기능 상세

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 건물 목록 테이블 | 전체 건물 목록, 정렬/필터/검색 | P0 |
| 우선순위 점수 | 5개 지표 기반 종합 점수 (100점 만점) | P0 |
| 필터링 | 건물유형, 지역, 점수 범위, 상태별 필터 | P0 |
| 상세 분석 패널 | 선택 건물의 상세 정보 및 지표별 점수 | P0 |
| 지표별 분석 | 레이더 차트로 5개 지표 시각화 | P1 |
| 엑셀 다운로드 | 분석 결과 내보내기 | P1 |
| 일괄 선택 | 여러 건물 선택 후 사업 신청 | P2 |

#### 2.2.3 우선순위 산정 알고리즘

```
종합점수 = (노후도 × 0.25) + (에너지효율 × 0.25) + (취약도 × 0.20) + (효율성 × 0.20) + (형평성 × 0.10)

- 노후도: (현재연도 - 준공연도) / 50 × 100
- 에너지효율: (해당 EUI - 최소 EUI) / (최대 EUI - 최소 EUI) × 100
- 취약도: 취약계층 이용 비율 × 100 (경로당/어린이집/보건소 가중치)
- 효율성: (예상절감량 / 예상사업비) 정규화
- 형평성: (1 - 지역 기지원율) × 100
```

---

### 2.3 벤치마킹 (Benchmarking)

#### 2.3.1 개요
"우리 건물과 비슷한 건물은 어떻게 리모델링했는지" 사례를 검색하고 비교하는 기능.

#### 2.3.2 기능 상세

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 유사 건물 매칭 | 선택 건물과 유사한 리모델링 완료 건물 자동 추천 | P0 |
| 매칭 기준 설정 | 용도, 연면적, 준공연도, 지역, 기후대 선택 | P0 |
| 사례 상세 보기 | 리모델링 항목, 비용, 효과, 공사기간 상세 | P0 |
| 비교 뷰 | 2~3개 건물 나란히 비교 | P1 |
| 담당자 후기 | 성공요인, 애로사항, 팁 공유 | P1 |
| 사례 북마크 | 관심 사례 저장 | P2 |

#### 2.3.3 유사도 알고리즘

```
유사도 = 1 / (1 + √(Σ(wi × (xi - yi)²)))

가중치:
- 용도코드: 0.30
- 연면적: 0.25
- 준공연도: 0.20
- 기후대: 0.15
- 에너지효율등급: 0.10
```

---

### 2.4 시뮬레이션 (Simulation)

#### 2.4.1 개요
리모델링 항목별 예상 효과를 시뮬레이션하여 의사결정을 지원하는 기능.

#### 2.4.2 기능 상세

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 건물 선택 | 시뮬레이션 대상 건물 선택 | P0 |
| 리모델링 항목 선택 | 단열, 창호, 설비, 조명, 신재생 등 체크박스 | P0 |
| 효과 계산 | 에너지 절감량, CO2 감축량, 비용 절감액, 회수기간 | P0 |
| 비교 시각화 | Before/After 에너지 바 차트 | P0 |
| 비용 견적 | 항목별 예상 사업비 산출 | P1 |
| 결과 저장/공유 | 시뮬레이션 결과 PDF 출력 | P2 |

#### 2.4.3 시뮬레이션 로직

```
에너지 절감량 = 현재 EUI × 면적 × 항목별 절감률
CO2 감축량 = 에너지 절감량 × 0.4594 (kgCO2/kWh)
비용 절감액 = 에너지 절감량 × 에너지 단가
투자회수기간 = 총 사업비 / 연간 비용 절감액

항목별 절감률 (예시):
- 외벽단열 100mm: 15%
- 창호교체 (로이삼중): 12%
- 보일러 (콘덴싱): 10%
- LED 조명: 8%
- 태양광 3kW: 5%
```

---

### 2.5 체크리스트 (Checklist)

#### 2.5.1 개요
건물 유형별 맞춤 사전조사 체크리스트를 자동 생성하고 관리하는 기능.

#### 2.5.2 기능 상세

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 체크리스트 생성 | 건물 유형별 자동 체크리스트 생성 | P0 |
| 항목 체크 | 체크박스로 완료 항목 표시 | P0 |
| 진행률 표시 | 전체 대비 완료 비율 프로그레스 바 | P0 |
| 단계별 구분 | 기본정보, 외피현황, 설비현황, 에너지현황, 이용자현황 | P0 |
| 사진 첨부 | 각 항목별 사진 업로드 (UI만, 실제 업로드 X) | P1 |
| 보고서 생성 | 체크리스트 기반 보고서 자동 생성 | P2 |

#### 2.5.3 건물 유형별 체크리스트 항목 수

| 건물 유형 | 필수 항목 | 선택 항목 | 총 항목 |
|----------|----------|----------|--------|
| 경로당 | 23 | 5 | 28 |
| 어린이집 | 25 | 6 | 31 |
| 보건소 | 27 | 8 | 35 |

---

## 3. 비기능 요구사항

### 3.1 성능
- 초기 로딩: 3초 이내 (LCP)
- 페이지 전환: 500ms 이내
- 건물 500개 테이블 렌더링: 1초 이내

### 3.2 반응형 디자인
- Desktop: 1440px, 1920px
- Tablet: 768px, 1024px
- Mobile: 375px, 414px

### 3.3 브라우저 지원
- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+

### 3.4 접근성
- WCAG 2.1 AA 기준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환

---

## 4. 기술 스택

### 4.1 Frontend
```
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS 3.4
- UI Components: shadcn/ui
- Charts: Recharts
- Maps: Leaflet + react-leaflet
- State: Zustand
- Forms: React Hook Form + Zod
```

### 4.2 데이터
```
- 목업 데이터: JSON 파일 기반
- 건물 데이터: 500개+
- 리모델링 사례: 50개
```

### 4.3 배포
```
- Hosting: Vercel
- Repository: GitHub
- CI/CD: Vercel 자동 배포
```

---

## 5. 목업 데이터 명세

### 5.1 건물 데이터 (buildings)

```typescript
interface Building {
  id: string;
  name: string;                    // 건물명
  type: 'senior_center' | 'daycare' | 'health_center';  // 유형
  address: string;                 // 주소
  region: string;                  // 시도
  district: string;                // 시군구
  coordinates: [number, number];   // 위경도
  yearBuilt: number;               // 준공연도
  grossArea: number;               // 연면적 (㎡)
  floors: number;                  // 층수
  structure: string;               // 구조
  energyGrade: string;             // 에너지효율등급
  annualEnergy: number;            // 연간 에너지사용량 (kWh)
  eui: number;                     // 단위면적당 에너지사용량
  dailyUsers: number;              // 일평균 이용자수
  vulnerabilityScore: number;      // 취약도 점수
  priorityScore: number;           // 우선순위 종합점수
  status: 'pending' | 'in_progress' | 'completed';  // 리모델링 상태
  lastInspection: string;          // 최근 점검일
}
```

### 5.2 리모델링 사례 (cases)

```typescript
interface RemodelingCase {
  id: string;
  buildingId: string;
  buildingName: string;
  type: string;
  region: string;
  yearBuilt: number;
  grossArea: number;
  completedDate: string;           // 완료일
  items: string[];                 // 리모델링 항목
  totalCost: number;               // 총 사업비
  constructionPeriod: number;      // 공사기간 (일)
  energySaving: number;            // 에너지 절감률 (%)
  co2Reduction: number;            // CO2 감축량 (tCO2/년)
  costSaving: number;              // 비용 절감액 (원/년)
  beforeEUI: number;
  afterEUI: number;
  review: {
    successFactors: string;
    challenges: string;
    tips: string;
    rating: number;
  };
}
```

### 5.3 체크리스트 템플릿 (checklistTemplates)

```typescript
interface ChecklistTemplate {
  type: string;
  sections: {
    name: string;
    required: boolean;
    items: {
      id: string;
      label: string;
      required: boolean;
      hasPhoto: boolean;
    }[];
  }[];
}
```

---

## 6. 페이지 구조

```
/                           → 랜딩 페이지 (서비스 소개)
/dashboard                  → 대시보드
/priority                   → 우선순위 분석
/priority/[id]              → 건물 상세 분석
/benchmarking               → 벤치마킹
/benchmarking/[id]          → 사례 상세
/simulation                 → 시뮬레이션
/simulation/[id]            → 건물별 시뮬레이션
/checklist                  → 체크리스트 목록
/checklist/[id]             → 체크리스트 작성
```

---

## 7. 마일스톤

| 단계 | 내용 | 목표일 |
|------|------|--------|
| M1 | 프로젝트 설정, 목업 데이터 생성 | D+1 |
| M2 | 대시보드, 레이아웃 완성 | D+2 |
| M3 | 우선순위 분석 완성 | D+3 |
| M4 | 벤치마킹, 시뮬레이션 완성 | D+4 |
| M5 | 체크리스트, 최종 QA, 배포 | D+5 |

---

## 8. 성공 지표

1. **기능 완성도**: 5개 핵심 기능 100% 구현
2. **데이터 품질**: 실제 데이터처럼 보이는 목업 500건+
3. **UI/UX**: 직관적인 인터페이스, 3클릭 내 목표 달성
4. **성능**: Lighthouse 성능 점수 90점 이상
5. **배포**: Vercel 정상 배포 및 접속 가능

---

*작성일: 2025년 12월*
*버전: 1.0*
