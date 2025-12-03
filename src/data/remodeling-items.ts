import { RemodelingItem } from '@/types';

export const remodelingItems: RemodelingItem[] = [
  // 패시브 (단열·기밀)
  {
    id: 'PAS-001',
    name: '외벽 단열 (100mm)',
    category: 'passive',
    energySavingRate: 15,
    costPerArea: 80000,
    description: '외벽에 100mm 두께의 단열재를 추가 시공하여 열손실을 방지합니다.',
  },
  {
    id: 'PAS-002',
    name: '외벽 단열 (150mm)',
    category: 'passive',
    energySavingRate: 20,
    costPerArea: 110000,
    description: '외벽에 150mm 두께의 고성능 단열재를 시공하여 열손실을 최소화합니다.',
  },
  {
    id: 'PAS-003',
    name: '지붕 단열',
    category: 'passive',
    energySavingRate: 10,
    costPerArea: 60000,
    description: '지붕면에 단열재를 시공하여 여름철 냉방 및 겨울철 난방 효율을 향상시킵니다.',
  },
  {
    id: 'PAS-004',
    name: '바닥 단열',
    category: 'passive',
    energySavingRate: 8,
    costPerArea: 50000,
    description: '바닥면의 단열 성능을 강화하여 실내 온도를 유지합니다.',
  },
  {
    id: 'PAS-005',
    name: '창호 교체 (이중유리)',
    category: 'passive',
    energySavingRate: 8,
    costPerArea: 150000,
    description: '기존 단창을 이중유리 창호로 교체합니다.',
  },
  {
    id: 'PAS-006',
    name: '창호 교체 (로이삼중유리)',
    category: 'passive',
    energySavingRate: 12,
    costPerArea: 250000,
    description: '고단열 로이코팅 삼중유리 창호로 교체하여 단열성능을 극대화합니다.',
  },
  {
    id: 'PAS-007',
    name: '창호 기밀 보강',
    category: 'passive',
    energySavingRate: 3,
    costPerArea: 30000,
    description: '기존 창호의 기밀성을 보강하여 외기 침입을 방지합니다.',
  },

  // 액티브 (설비)
  {
    id: 'ACT-001',
    name: '보일러 교체 (콘덴싱)',
    category: 'active',
    energySavingRate: 10,
    costPerArea: 40000,
    description: '고효율 콘덴싱 보일러로 교체하여 난방 효율을 향상시킵니다.',
  },
  {
    id: 'ACT-002',
    name: '냉난방기 교체 (인버터)',
    category: 'active',
    energySavingRate: 12,
    costPerArea: 60000,
    description: '고효율 인버터 냉난방기로 교체합니다.',
  },
  {
    id: 'ACT-003',
    name: '환기 시스템 (열회수형)',
    category: 'active',
    energySavingRate: 5,
    costPerArea: 45000,
    description: '열회수형 환기 시스템을 설치하여 환기 시 열손실을 방지합니다.',
  },
  {
    id: 'ACT-004',
    name: '급탕 시스템 개선',
    category: 'active',
    energySavingRate: 4,
    costPerArea: 25000,
    description: '고효율 급탕 시스템으로 교체하여 온수 에너지를 절감합니다.',
  },
  {
    id: 'ACT-005',
    name: 'LED 조명 교체',
    category: 'active',
    energySavingRate: 8,
    costPerArea: 20000,
    description: '기존 형광등을 고효율 LED 조명으로 전면 교체합니다.',
  },
  {
    id: 'ACT-006',
    name: '조명 자동 제어 시스템',
    category: 'active',
    energySavingRate: 3,
    costPerArea: 15000,
    description: '재실 감지 및 조도 센서를 통한 자동 조명 제어 시스템을 설치합니다.',
  },

  // 신재생에너지
  {
    id: 'RNW-001',
    name: '태양광 발전 (3kW)',
    category: 'renewable',
    energySavingRate: 5,
    costPerArea: 35000,
    description: '3kW 규모의 태양광 발전 설비를 설치합니다.',
  },
  {
    id: 'RNW-002',
    name: '태양광 발전 (10kW)',
    category: 'renewable',
    energySavingRate: 12,
    costPerArea: 80000,
    description: '10kW 규모의 태양광 발전 설비를 설치합니다.',
  },
  {
    id: 'RNW-003',
    name: '태양열 급탕',
    category: 'renewable',
    energySavingRate: 4,
    costPerArea: 30000,
    description: '태양열을 이용한 급탕 시스템을 설치합니다.',
  },
  {
    id: 'RNW-004',
    name: '지열 냉난방',
    category: 'renewable',
    energySavingRate: 18,
    costPerArea: 150000,
    description: '지열 히트펌프를 이용한 냉난방 시스템을 설치합니다.',
  },
];

export const getItemById = (id: string): RemodelingItem | undefined => {
  return remodelingItems.find((item) => item.id === id);
};

export const getItemsByCategory = (category: RemodelingItem['category']): RemodelingItem[] => {
  return remodelingItems.filter((item) => item.category === category);
};

export const getCategoryLabel = (category: RemodelingItem['category']): string => {
  const labels: Record<RemodelingItem['category'], string> = {
    passive: '패시브 (단열·기밀)',
    active: '액티브 (설비)',
    renewable: '신재생에너지',
  };
  return labels[category];
};
