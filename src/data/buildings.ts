import { Building, BuildingType, EnergyGrade, RemodelingStatus } from '@/types';
import { regions } from './regions';

// 건물명 접두사
const seniorCenterNames = ['행복', '사랑', '희망', '화합', '소망', '평화', '우정', '정다운', '해맑은', '푸른', '새마을', '햇살', '온누리', '어울림', '보람', '나눔', '기쁨', '감사', '덕수', '청운'];
const daycareNames = ['꿈나무', '사랑', '햇살', '별빛', '무지개', '파랑새', '아이사랑', '동심', '푸른숲', '작은별', '늘푸른', '예쁜', '튼튼', '밝은', '새싹', '꼬마', '아기별', '도담도담', '하늘', '숲속'];
const healthCenterNames = ['중앙', '시민', '건강', '행복', '희망', '새생명', '온누리', '푸른', '밝은', '생명'];

// 구조 유형
const structures = ['철근콘크리트', '조적조', '경량철골', '목구조', '철골조'];

// 좌표 범위 (대한민국)
const coordRanges: Record<string, { lat: [number, number]; lng: [number, number] }> = {
  seoul: { lat: [37.45, 37.70], lng: [126.80, 127.15] },
  busan: { lat: [35.05, 35.25], lng: [128.90, 129.20] },
  daegu: { lat: [35.80, 35.95], lng: [128.50, 128.75] },
  incheon: { lat: [37.35, 37.60], lng: [126.55, 126.80] },
  gwangju: { lat: [35.10, 35.25], lng: [126.80, 127.00] },
  daejeon: { lat: [36.30, 36.45], lng: [127.30, 127.50] },
  ulsan: { lat: [35.50, 35.65], lng: [129.25, 129.45] },
  sejong: { lat: [36.45, 36.55], lng: [127.20, 127.35] },
  gyeonggi: { lat: [36.90, 37.90], lng: [126.60, 127.90] },
  gangwon: { lat: [37.20, 38.30], lng: [127.70, 129.40] },
  chungbuk: { lat: [36.40, 37.20], lng: [127.40, 128.20] },
  chungnam: { lat: [36.00, 36.90], lng: [126.10, 127.40] },
  jeonbuk: { lat: [35.40, 36.20], lng: [126.40, 127.90] },
  jeonnam: { lat: [34.10, 35.30], lng: [126.00, 127.70] },
  gyeongbuk: { lat: [35.60, 37.10], lng: [128.30, 129.60] },
  gyeongnam: { lat: [34.80, 35.80], lng: [127.70, 129.20] },
  jeju: { lat: [33.20, 33.60], lng: [126.10, 126.95] },
};

// 랜덤 숫자 생성
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 랜덤 소수 생성
const randomFloat = (min: number, max: number, decimals: number = 2): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

// 랜덤 배열 요소 선택
const randomChoice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// 랜덤 좌표 생성
const randomCoord = (regionCode: string): [number, number] => {
  const range = coordRanges[regionCode] || coordRanges.seoul;
  return [
    randomFloat(range.lat[0], range.lat[1], 6),
    randomFloat(range.lng[0], range.lng[1], 6),
  ];
};

// 우선순위 점수 계산
const calculatePriorityScore = (scores: Building['scores']): number => {
  return Math.round(
    scores.age * 0.25 +
    scores.energy * 0.25 +
    scores.vulnerability * 0.20 +
    scores.efficiency * 0.20 +
    scores.equity * 0.10
  );
};

// 건물 생성 함수
const generateBuilding = (
  id: number,
  type: BuildingType,
  regionCode: string,
  district: string
): Building => {
  const region = regions.find((r) => r.code === regionCode)!;
  const yearBuilt = random(1975, 2015);
  const age = 2024 - yearBuilt;

  let name: string;
  let grossArea: number;
  let dailyUsers: number;
  let floors: number;

  switch (type) {
    case 'senior_center':
      name = `${randomChoice(seniorCenterNames)}경로당`;
      grossArea = random(50, 200);
      dailyUsers = random(15, 60);
      floors = random(1, 2);
      break;
    case 'daycare':
      name = `${randomChoice(daycareNames)}어린이집`;
      grossArea = random(200, 800);
      dailyUsers = random(30, 150);
      floors = random(1, 3);
      break;
    case 'health_center':
      name = `${district} ${randomChoice(healthCenterNames)}보건소`;
      grossArea = random(500, 3000);
      dailyUsers = random(100, 500);
      floors = random(2, 5);
      break;
  }

  const eui = random(150, 450);
  const annualEnergy = Math.round(grossArea * eui);

  // 에너지 효율 등급 (EUI 기반)
  let energyGrade: EnergyGrade;
  if (eui < 180) energyGrade = '1';
  else if (eui < 220) energyGrade = '2';
  else if (eui < 270) energyGrade = '3';
  else if (eui < 320) energyGrade = '4';
  else if (eui < 370) energyGrade = '5';
  else if (eui < 420) energyGrade = '6';
  else energyGrade = '7';

  // 상태 결정 (대부분 pending)
  let status: RemodelingStatus;
  const statusRand = Math.random();
  if (statusRand < 0.08) status = 'completed';
  else if (statusRand < 0.15) status = 'in_progress';
  else status = 'pending';

  // 점수 계산
  const scores = {
    age: Math.min(100, Math.round((age / 50) * 100)),
    energy: Math.min(100, Math.round(((eui - 150) / 300) * 100)),
    vulnerability: type === 'senior_center' ? random(70, 100) : type === 'daycare' ? random(65, 95) : random(50, 80),
    efficiency: random(50, 95),
    equity: random(40, 90),
  };

  const priorityScore = calculatePriorityScore(scores);
  const vulnerabilityScore = scores.vulnerability;

  return {
    id: `BLD-${String(id).padStart(5, '0')}`,
    name,
    type,
    address: `${region.name} ${district} ${random(1, 500)}번지`,
    region: region.name,
    district,
    coordinates: randomCoord(regionCode),
    yearBuilt,
    grossArea,
    floors,
    structure: randomChoice(structures),
    energyGrade,
    annualEnergy,
    eui,
    dailyUsers,
    vulnerabilityScore,
    priorityScore,
    status,
    lastInspection: `2024-${String(random(1, 12)).padStart(2, '0')}-${String(random(1, 28)).padStart(2, '0')}`,
    scores,
  };
};

// 건물 데이터 생성
const generateBuildings = (): Building[] => {
  const buildings: Building[] = [];
  let id = 1;

  // 각 지역별로 건물 생성
  regions.forEach((region) => {
    const buildingsPerRegion = region.code === 'gyeonggi' ? 60 :
                               region.code === 'seoul' ? 50 :
                               region.code === 'busan' ? 35 :
                               region.code === 'jeju' ? 15 :
                               random(20, 35);

    // 지역 내 구/군 중 일부 선택
    const selectedDistricts = region.districts.slice(0, Math.min(10, region.districts.length));

    for (let i = 0; i < buildingsPerRegion; i++) {
      const district = randomChoice(selectedDistricts);

      // 경로당 60%, 어린이집 20%, 보건소 20%
      let type: BuildingType;
      const typeRand = Math.random();
      if (typeRand < 0.60) type = 'senior_center';
      else if (typeRand < 0.80) type = 'daycare';
      else type = 'health_center';

      buildings.push(generateBuilding(id++, type, region.code, district));
    }
  });

  // 우선순위 점수로 정렬
  return buildings.sort((a, b) => b.priorityScore - a.priorityScore);
};

export const buildings: Building[] = generateBuildings();

// 유틸리티 함수들
export const getBuildingById = (id: string): Building | undefined => {
  return buildings.find((b) => b.id === id);
};

export const getBuildingsByRegion = (region: string): Building[] => {
  return buildings.filter((b) => b.region === region);
};

export const getBuildingsByType = (type: BuildingType): Building[] => {
  return buildings.filter((b) => b.type === type);
};

export const getBuildingsByStatus = (status: RemodelingStatus): Building[] => {
  return buildings.filter((b) => b.status === status);
};

export const getTopPriorityBuildings = (count: number = 10): Building[] => {
  return buildings.filter((b) => b.status === 'pending').slice(0, count);
};

export const getUrgentBuildings = (): Building[] => {
  return buildings.filter((b) => b.status === 'pending' && b.priorityScore >= 80);
};

// 통계
export const getBuildingStats = () => {
  const total = buildings.length;
  const completed = buildings.filter((b) => b.status === 'completed').length;
  const inProgress = buildings.filter((b) => b.status === 'in_progress').length;
  const pending = buildings.filter((b) => b.status === 'pending').length;
  const urgent = getUrgentBuildings().length;

  const avgEnergyGrade = buildings.reduce((sum, b) => sum + parseInt(b.energyGrade), 0) / total;

  const completedBuildings = buildings.filter((b) => b.status === 'completed');
  const totalEnergySaving = completedBuildings.reduce((sum, b) => sum + Math.round(b.annualEnergy * 0.33), 0);
  const totalCo2Reduction = Math.round(totalEnergySaving * 0.4594 / 1000);

  return {
    totalBuildings: total,
    completed,
    inProgress,
    pending,
    urgent,
    avgEnergyGrade: parseFloat(avgEnergyGrade.toFixed(1)),
    totalEnergySaving,
    totalCo2Reduction,
  };
};
