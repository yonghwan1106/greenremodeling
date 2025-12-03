// 건물 유형
export type BuildingType = 'senior_center' | 'daycare' | 'health_center';

// 리모델링 상태
export type RemodelingStatus = 'pending' | 'in_progress' | 'completed';

// 에너지 효율 등급
export type EnergyGrade = '1' | '2' | '3' | '4' | '5' | '6' | '7';

// 건물 데이터
export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  address: string;
  region: string;
  district: string;
  coordinates: [number, number]; // [lat, lng]
  yearBuilt: number;
  grossArea: number;
  floors: number;
  structure: string;
  energyGrade: EnergyGrade;
  annualEnergy: number;
  eui: number;
  dailyUsers: number;
  vulnerabilityScore: number;
  priorityScore: number;
  status: RemodelingStatus;
  lastInspection: string;
  // 상세 점수
  scores: {
    age: number;
    energy: number;
    vulnerability: number;
    efficiency: number;
    equity: number;
  };
}

// 리모델링 항목
export interface RemodelingItem {
  id: string;
  name: string;
  category: 'passive' | 'active' | 'renewable';
  energySavingRate: number;
  costPerArea: number;
  description: string;
}

// 리모델링 사례
export interface RemodelingCase {
  id: string;
  buildingId: string;
  buildingName: string;
  type: BuildingType;
  region: string;
  district: string;
  yearBuilt: number;
  grossArea: number;
  completedDate: string;
  items: string[];
  totalCost: number;
  constructionPeriod: number;
  energySavingRate: number;
  co2Reduction: number;
  costSaving: number;
  beforeEUI: number;
  afterEUI: number;
  review: {
    successFactors: string;
    challenges: string;
    tips: string;
    rating: number;
  };
}

// 체크리스트 항목
export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  hasPhoto: boolean;
  checked: boolean;
  note?: string;
}

// 체크리스트 섹션
export interface ChecklistSection {
  id: string;
  name: string;
  required: boolean;
  items: ChecklistItem[];
}

// 체크리스트
export interface Checklist {
  id: string;
  buildingId: string;
  buildingName: string;
  buildingType: BuildingType;
  createdAt: string;
  updatedAt: string;
  progress: number;
  sections: ChecklistSection[];
}

// 시뮬레이션 입력
export interface SimulationInput {
  buildingType: BuildingType;
  grossArea: number;
  yearBuilt: number;
  currentEUI: number;
  selectedItems: string[];
}

// 시뮬레이션 항목별 결과
export interface SimulationItemResult {
  itemId: string;
  name: string;
  cost: number;
  savingRate: number;
  annualSaving: number;
}

// 시뮬레이션 결과
export interface SimulationResult {
  currentEUI: number;
  expectedEUI: number;
  energySavingRate: number;
  co2Reduction: number;
  annualSaving: number;
  totalCost: number;
  costPerArea: number;
  paybackPeriod: number;
  itemBreakdown: SimulationItemResult[];
}

// 통계 데이터
export interface DashboardStats {
  totalBuildings: number;
  completed: number;
  inProgress: number;
  pending: number;
  urgent: number;
  avgEnergyGrade: number;
  totalEnergySaving: number;
  totalCo2Reduction: number;
}

// 알림
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'deadline';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// 지역 데이터
export interface Region {
  code: string;
  name: string;
  districts: string[];
}

// 건물 유형 라벨
export const BUILDING_TYPE_LABELS: Record<BuildingType, string> = {
  senior_center: '경로당',
  daycare: '어린이집',
  health_center: '보건소',
};

// 상태 라벨
export const STATUS_LABELS: Record<RemodelingStatus, string> = {
  pending: '대기',
  in_progress: '진행중',
  completed: '완료',
};

// 상태 색상
export const STATUS_COLORS: Record<RemodelingStatus, string> = {
  pending: 'bg-yellow-500',
  in_progress: 'bg-blue-500',
  completed: 'bg-green-500',
};
