import { ChecklistSection, BuildingType } from '@/types';

// 경로당 체크리스트
const seniorCenterChecklist: ChecklistSection[] = [
  {
    id: 'basic',
    name: '기본정보',
    required: true,
    items: [
      { id: 'basic-1', label: '건물명/주소 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-2', label: '준공연도 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-3', label: '연면적 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-4', label: '층수/구조 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-5', label: '에너지효율등급 확인', required: true, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'envelope',
    name: '외피현황',
    required: true,
    items: [
      { id: 'env-1', label: '외벽 구조 확인', required: true, hasPhoto: true, checked: false },
      { id: 'env-2', label: '외벽 단열재 종류/두께', required: true, hasPhoto: true, checked: false },
      { id: 'env-3', label: '외벽 상태 (균열, 누수 등)', required: true, hasPhoto: true, checked: false },
      { id: 'env-4', label: '창호 종류/규격', required: true, hasPhoto: true, checked: false },
      { id: 'env-5', label: '창호 기밀 상태', required: true, hasPhoto: true, checked: false },
      { id: 'env-6', label: '지붕 단열 현황', required: true, hasPhoto: true, checked: false },
      { id: 'env-7', label: '바닥 단열 현황', required: true, hasPhoto: false, checked: false },
      { id: 'env-8', label: '열교 취약부위 확인', required: false, hasPhoto: true, checked: false },
    ],
  },
  {
    id: 'equipment',
    name: '설비현황',
    required: true,
    items: [
      { id: 'eqp-1', label: '난방 방식/설비 종류', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-2', label: '난방 설비 용량/연식', required: true, hasPhoto: false, checked: false },
      { id: 'eqp-3', label: '냉방 방식/설비 종류', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-4', label: '환기 시스템 유무', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-5', label: '조명 종류/개수', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-6', label: '급탕 설비', required: false, hasPhoto: false, checked: false },
      { id: 'eqp-7', label: '신재생에너지 설비 유무', required: false, hasPhoto: true, checked: false },
    ],
  },
  {
    id: 'energy',
    name: '에너지현황',
    required: true,
    items: [
      { id: 'eng-1', label: '연간 전기사용량', required: true, hasPhoto: false, checked: false },
      { id: 'eng-2', label: '연간 가스사용량', required: true, hasPhoto: false, checked: false },
      { id: 'eng-3', label: '연간 에너지비용', required: true, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'user',
    name: '이용자현황',
    required: false,
    items: [
      { id: 'usr-1', label: '일평균 이용자수', required: false, hasPhoto: false, checked: false },
      { id: 'usr-2', label: '운영 시간', required: false, hasPhoto: false, checked: false },
      { id: 'usr-3', label: '이용자 불편사항', required: false, hasPhoto: false, checked: false },
    ],
  },
];

// 어린이집 체크리스트
const daycareChecklist: ChecklistSection[] = [
  {
    id: 'basic',
    name: '기본정보',
    required: true,
    items: [
      { id: 'basic-1', label: '건물명/주소 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-2', label: '준공연도 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-3', label: '연면적 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-4', label: '층수/구조 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-5', label: '에너지효율등급 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-6', label: '정원/현원 확인', required: true, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'envelope',
    name: '외피현황',
    required: true,
    items: [
      { id: 'env-1', label: '외벽 구조 확인', required: true, hasPhoto: true, checked: false },
      { id: 'env-2', label: '외벽 단열재 종류/두께', required: true, hasPhoto: true, checked: false },
      { id: 'env-3', label: '외벽 상태 (균열, 누수 등)', required: true, hasPhoto: true, checked: false },
      { id: 'env-4', label: '창호 종류/규격', required: true, hasPhoto: true, checked: false },
      { id: 'env-5', label: '창호 기밀/안전 상태', required: true, hasPhoto: true, checked: false },
      { id: 'env-6', label: '지붕 단열 현황', required: true, hasPhoto: true, checked: false },
      { id: 'env-7', label: '바닥 단열 현황', required: true, hasPhoto: false, checked: false },
      { id: 'env-8', label: '열교 취약부위 확인', required: false, hasPhoto: true, checked: false },
      { id: 'env-9', label: '결로 발생 여부', required: true, hasPhoto: true, checked: false },
    ],
  },
  {
    id: 'equipment',
    name: '설비현황',
    required: true,
    items: [
      { id: 'eqp-1', label: '난방 방식/설비 종류', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-2', label: '난방 설비 용량/연식', required: true, hasPhoto: false, checked: false },
      { id: 'eqp-3', label: '냉방 방식/설비 종류', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-4', label: '환기 시스템 유무/종류', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-5', label: '실내공기질 관리 설비', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-6', label: '조명 종류/개수', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-7', label: '급탕 설비', required: true, hasPhoto: false, checked: false },
      { id: 'eqp-8', label: '신재생에너지 설비 유무', required: false, hasPhoto: true, checked: false },
    ],
  },
  {
    id: 'energy',
    name: '에너지현황',
    required: true,
    items: [
      { id: 'eng-1', label: '연간 전기사용량', required: true, hasPhoto: false, checked: false },
      { id: 'eng-2', label: '연간 가스사용량', required: true, hasPhoto: false, checked: false },
      { id: 'eng-3', label: '연간 에너지비용', required: true, hasPhoto: false, checked: false },
      { id: 'eng-4', label: '월별 에너지 사용 패턴', required: false, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'user',
    name: '이용자현황',
    required: false,
    items: [
      { id: 'usr-1', label: '원아 수/연령대', required: false, hasPhoto: false, checked: false },
      { id: 'usr-2', label: '운영 시간', required: false, hasPhoto: false, checked: false },
      { id: 'usr-3', label: '교사/직원 불편사항', required: false, hasPhoto: false, checked: false },
    ],
  },
];

// 보건소 체크리스트
const healthCenterChecklist: ChecklistSection[] = [
  {
    id: 'basic',
    name: '기본정보',
    required: true,
    items: [
      { id: 'basic-1', label: '건물명/주소 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-2', label: '준공연도 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-3', label: '연면적 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-4', label: '층수/구조 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-5', label: '에너지효율등급 확인', required: true, hasPhoto: false, checked: false },
      { id: 'basic-6', label: '층별 용도 확인', required: true, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'envelope',
    name: '외피현황',
    required: true,
    items: [
      { id: 'env-1', label: '외벽 구조 확인', required: true, hasPhoto: true, checked: false },
      { id: 'env-2', label: '외벽 단열재 종류/두께', required: true, hasPhoto: true, checked: false },
      { id: 'env-3', label: '외벽 상태 (균열, 누수 등)', required: true, hasPhoto: true, checked: false },
      { id: 'env-4', label: '창호 종류/규격', required: true, hasPhoto: true, checked: false },
      { id: 'env-5', label: '창호 기밀 상태', required: true, hasPhoto: true, checked: false },
      { id: 'env-6', label: '지붕 단열 현황', required: true, hasPhoto: true, checked: false },
      { id: 'env-7', label: '바닥 단열 현황', required: true, hasPhoto: false, checked: false },
      { id: 'env-8', label: '열교 취약부위 확인', required: false, hasPhoto: true, checked: false },
      { id: 'env-9', label: '출입구 방풍실 유무', required: true, hasPhoto: true, checked: false },
    ],
  },
  {
    id: 'equipment',
    name: '설비현황',
    required: true,
    items: [
      { id: 'eqp-1', label: '중앙 난방 시스템', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-2', label: '난방 설비 용량/연식', required: true, hasPhoto: false, checked: false },
      { id: 'eqp-3', label: '중앙 냉방 시스템', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-4', label: '개별 냉난방기 현황', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-5', label: '환기 시스템 유무/종류', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-6', label: '조명 종류/개수', required: true, hasPhoto: true, checked: false },
      { id: 'eqp-7', label: '의료장비 전력 현황', required: true, hasPhoto: false, checked: false },
      { id: 'eqp-8', label: '급탕 설비', required: true, hasPhoto: false, checked: false },
      { id: 'eqp-9', label: '신재생에너지 설비 유무', required: false, hasPhoto: true, checked: false },
      { id: 'eqp-10', label: 'EMS/BEMS 설치 유무', required: false, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'energy',
    name: '에너지현황',
    required: true,
    items: [
      { id: 'eng-1', label: '연간 전기사용량', required: true, hasPhoto: false, checked: false },
      { id: 'eng-2', label: '연간 가스사용량', required: true, hasPhoto: false, checked: false },
      { id: 'eng-3', label: '연간 에너지비용', required: true, hasPhoto: false, checked: false },
      { id: 'eng-4', label: '월별 에너지 사용 패턴', required: false, hasPhoto: false, checked: false },
      { id: 'eng-5', label: '피크 전력 관리 현황', required: false, hasPhoto: false, checked: false },
    ],
  },
  {
    id: 'user',
    name: '이용자현황',
    required: false,
    items: [
      { id: 'usr-1', label: '일평균 이용자수', required: false, hasPhoto: false, checked: false },
      { id: 'usr-2', label: '운영 시간', required: false, hasPhoto: false, checked: false },
      { id: 'usr-3', label: '직원/이용자 불편사항', required: false, hasPhoto: false, checked: false },
      { id: 'usr-4', label: '특수 환경 요구사항 (냉장고 등)', required: false, hasPhoto: false, checked: false },
    ],
  },
];

// 템플릿 리스트 export
export const checklistTemplates = [
  { buildingType: 'senior_center' as BuildingType, sections: seniorCenterChecklist },
  { buildingType: 'daycare' as BuildingType, sections: daycareChecklist },
  { buildingType: 'health_center' as BuildingType, sections: healthCenterChecklist },
];

export const getChecklistTemplate = (type: BuildingType): ChecklistSection[] => {
  switch (type) {
    case 'senior_center':
      return JSON.parse(JSON.stringify(seniorCenterChecklist));
    case 'daycare':
      return JSON.parse(JSON.stringify(daycareChecklist));
    case 'health_center':
      return JSON.parse(JSON.stringify(healthCenterChecklist));
    default:
      return JSON.parse(JSON.stringify(seniorCenterChecklist));
  }
};

export const getChecklistItemCount = (type: BuildingType): { required: number; optional: number; total: number } => {
  const template = getChecklistTemplate(type);
  let required = 0;
  let optional = 0;

  template.forEach((section) => {
    section.items.forEach((item) => {
      if (item.required) required++;
      else optional++;
    });
  });

  return { required, optional, total: required + optional };
};
