import { RemodelingCase, BuildingType } from '@/types';

// 리모델링 항목 조합
const itemCombinations = [
  ['외벽 단열 (100mm)', '창호 교체 (이중유리)', 'LED 조명 교체'],
  ['외벽 단열 (100mm)', '창호 교체 (로이삼중유리)', '보일러 교체 (콘덴싱)'],
  ['외벽 단열 (150mm)', '창호 교체 (로이삼중유리)', '보일러 교체 (콘덴싱)', 'LED 조명 교체'],
  ['지붕 단열', '창호 교체 (이중유리)', '냉난방기 교체 (인버터)'],
  ['외벽 단열 (100mm)', '지붕 단열', '창호 교체 (이중유리)', 'LED 조명 교체'],
  ['창호 교체 (로이삼중유리)', '보일러 교체 (콘덴싱)', '환기 시스템 (열회수형)'],
  ['외벽 단열 (150mm)', '창호 교체 (로이삼중유리)', '냉난방기 교체 (인버터)', '태양광 발전 (3kW)'],
  ['외벽 단열 (100mm)', '바닥 단열', '창호 교체 (이중유리)', '보일러 교체 (콘덴싱)'],
];

// 성공 요인
const successFactors = [
  '충분한 사전조사를 통해 건물 상태를 정확히 파악했습니다. 특히 열화상 카메라를 활용한 열교 부위 진단이 효과적이었습니다.',
  '이용자들의 불편사항을 사전에 청취하여 우선 개선 항목을 선정했습니다. 실제 체감 만족도가 높았습니다.',
  '유사 건물 리모델링 사례를 참고하여 비용 대비 효과가 높은 항목 위주로 시공했습니다.',
  '시공사 선정 시 그린리모델링 경험이 풍부한 업체를 선택하여 공사 품질을 확보했습니다.',
  '단계별 공사 계획을 수립하여 이용자 불편을 최소화했습니다. 특히 휴관일을 활용한 집중 시공이 효과적이었습니다.',
  '지역 에너지공단의 컨설팅을 통해 최적의 리모델링 방안을 도출했습니다.',
  '건물 운영자와 긴밀히 소통하여 실제 사용 패턴에 맞는 설비를 선정했습니다.',
];

// 애로사항
const challenges = [
  '공사 기간 중 이용자 민원이 다수 발생했습니다. 사전 홍보와 대체 공간 마련이 필요합니다.',
  '예상보다 건물 노후도가 심해 추가 비용이 발생했습니다. 충분한 예비비 확보가 중요합니다.',
  '자재 수급 지연으로 공사 기간이 2주 연장되었습니다. 자재 선발주가 필요합니다.',
  '기존 설비와 신규 설비 간 호환성 문제가 있었습니다. 사전 기술 검토가 필수입니다.',
  '민원으로 인해 일부 공사 항목을 변경해야 했습니다. 이해관계자 사전 동의가 중요합니다.',
  '동절기 공사로 단열재 시공에 어려움이 있었습니다. 계절을 고려한 공정 계획이 필요합니다.',
  '설계 도면과 실제 건물 상태가 달라 현장 변경이 많았습니다. 정밀 실측이 중요합니다.',
];

// 팁
const tips = [
  '창호 교체 시 기밀성이 높은 제품을 선택하세요. 단열보다 기밀이 체감 효과가 큽니다.',
  '보일러 교체 시 기존 배관 상태를 반드시 점검하세요. 배관 누수가 효율을 크게 떨어뜨립니다.',
  'LED 조명은 색온도를 고려하세요. 경로당은 따뜻한 색(3000K), 보건소는 밝은 색(5000K)이 적합합니다.',
  '공사 전 이용자 대상 설명회를 개최하세요. 이해와 협조를 구하는 것이 민원 예방의 핵심입니다.',
  '사진 기록을 꼼꼼히 남기세요. 시공 전후 비교 자료로 성과 보고에 유용합니다.',
  '에너지 절감량을 모니터링할 수 있도록 계량기 위치를 고려하세요.',
  '유지보수가 용이한 제품을 선택하세요. 고효율 제품도 관리가 어려우면 무용지물입니다.',
  '시공사에게 사용자 교육을 요청하세요. 올바른 사용법이 에너지 절감의 절반입니다.',
];

// 랜덤 함수들
const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 리모델링 사례 생성
const generateCases = (): RemodelingCase[] => {
  const cases: RemodelingCase[] = [];
  const regions = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도'];
  const districts: Record<string, string[]> = {
    '서울특별시': ['강남구', '강서구', '노원구', '송파구', '마포구'],
    '부산광역시': ['해운대구', '부산진구', '동래구', '남구'],
    '대구광역시': ['수성구', '달서구', '북구'],
    '인천광역시': ['남동구', '부평구', '연수구'],
    '광주광역시': ['광산구', '북구', '서구'],
    '대전광역시': ['유성구', '서구', '대덕구'],
    '울산광역시': ['남구', '울주군'],
    '경기도': ['수원시', '성남시', '고양시', '용인시', '화성시', '안산시'],
    '강원특별자치도': ['춘천시', '원주시', '강릉시'],
    '충청북도': ['청주시', '충주시', '제천시'],
    '충청남도': ['천안시', '아산시', '논산시'],
    '전북특별자치도': ['전주시', '익산시', '군산시'],
    '전라남도': ['순천시', '여수시', '목포시'],
    '경상북도': ['포항시', '경주시', '구미시'],
    '경상남도': ['창원시', '김해시', '진주시'],
    '제주특별자치도': ['제주시', '서귀포시'],
  };

  const seniorNames = ['행복', '사랑', '희망', '화합', '소망', '평화'];
  const daycareNames = ['꿈나무', '사랑', '햇살', '별빛', '무지개'];
  const healthNames = ['중앙', '시민', '건강'];

  let id = 1;

  for (let i = 0; i < 50; i++) {
    const region = randomChoice(regions);
    const district = randomChoice(districts[region] || ['시내']);

    // 타입 결정 (경로당 60%, 어린이집 25%, 보건소 15%)
    let type: BuildingType;
    let buildingName: string;
    let grossArea: number;

    const typeRand = Math.random();
    if (typeRand < 0.60) {
      type = 'senior_center';
      buildingName = `${randomChoice(seniorNames)}경로당`;
      grossArea = random(80, 180);
    } else if (typeRand < 0.85) {
      type = 'daycare';
      buildingName = `${randomChoice(daycareNames)}어린이집`;
      grossArea = random(250, 600);
    } else {
      type = 'health_center';
      buildingName = `${district} ${randomChoice(healthNames)}보건소`;
      grossArea = random(800, 2500);
    }

    const yearBuilt = random(1980, 2010);
    const items = randomChoice(itemCombinations);
    const energySavingRate = random(28, 45);
    const beforeEUI = random(280, 420);
    const afterEUI = Math.round(beforeEUI * (1 - energySavingRate / 100));

    // 비용 계산 (면적 기반)
    const totalCost = grossArea * random(400000, 800000);
    const annualEnergySaving = grossArea * beforeEUI * (energySavingRate / 100);
    const costSaving = Math.round(annualEnergySaving * 180); // 전기요금 180원/kWh 가정
    const co2Reduction = parseFloat((annualEnergySaving * 0.4594 / 1000).toFixed(1));

    const completedYear = random(2021, 2024);
    const completedMonth = String(random(1, 12)).padStart(2, '0');

    cases.push({
      id: `CASE-${String(id++).padStart(4, '0')}`,
      buildingId: `BLD-${String(random(1, 500)).padStart(5, '0')}`,
      buildingName: `${district} ${buildingName}`,
      type,
      region,
      district,
      yearBuilt,
      grossArea,
      completedDate: `${completedYear}-${completedMonth}-${String(random(1, 28)).padStart(2, '0')}`,
      items,
      totalCost,
      constructionPeriod: random(30, 90),
      energySavingRate,
      co2Reduction,
      costSaving,
      beforeEUI,
      afterEUI,
      review: {
        successFactors: randomChoice(successFactors),
        challenges: randomChoice(challenges),
        tips: randomChoice(tips),
        rating: random(4, 5),
      },
    });
  }

  // 완료일 기준 정렬 (최신순)
  return cases.sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime());
};

export const remodelingCases: RemodelingCase[] = generateCases();

export const getCaseById = (id: string): RemodelingCase | undefined => {
  return remodelingCases.find((c) => c.id === id);
};

export const getCasesByType = (type: BuildingType): RemodelingCase[] => {
  return remodelingCases.filter((c) => c.type === type);
};

export const getCasesByRegion = (region: string): RemodelingCase[] => {
  return remodelingCases.filter((c) => c.region === region);
};

// 유사 건물 찾기 (간단한 유사도 계산)
export const findSimilarCases = (
  type: BuildingType,
  grossArea: number,
  yearBuilt: number,
  limit: number = 5
): RemodelingCase[] => {
  const filtered = remodelingCases.filter((c) => c.type === type);

  // 유사도 계산
  const withSimilarity = filtered.map((c) => {
    const areaDiff = Math.abs(c.grossArea - grossArea) / grossArea;
    const yearDiff = Math.abs(c.yearBuilt - yearBuilt) / 50;
    const similarity = 1 - (areaDiff * 0.6 + yearDiff * 0.4);
    return { ...c, similarity: Math.max(0, Math.min(1, similarity)) };
  });

  // 유사도 순으로 정렬
  return withSimilarity
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
};
