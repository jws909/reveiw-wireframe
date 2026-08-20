import { DailyReview, CurationItem, SponsoredInfo } from '../types/review';

export const SAMPLE_SPONSORED_PRESETS: Record<string, SponsoredInfo> = {
  '소니 WH-1000XM5': {
    title: '소니 WH-1000XM5 무선 노이즈 캔슬링 헤드폰',
    price: '379,000원',
    originalPrice: '479,000원',
    discountRate: '21%',
    platform: '쿠팡 로켓배송',
    url: 'https://example.com/item/sony-xm5',
    badge: '최저가 보장',
    ctaText: '로켓배송 최저가 구매하기',
  },
  '스타벅스 아메리카노': {
    title: '스타벅스 e-카드 3만원권 (5% 페이백)',
    price: '28,500원',
    originalPrice: '30,000원',
    discountRate: '5%',
    platform: '네이버쇼핑 제휴',
    url: 'https://example.com/item/starbucks',
    badge: '모바일 쿠폰',
    ctaText: '할인 쿠폰 받기',
  },
  '성수 어니언 카페': {
    title: '성수 어니언 시그니처 팡도르 & 브런치 패키지 예약',
    price: '18,900원',
    platform: '캐치테이블 제휴',
    url: 'https://example.com/place/onion-seongsu',
    badge: '웨이팅 패스',
    ctaText: '실시간 예약 / 웨이팅 신청',
  },
  '쏘카 아이오닉 5': {
    title: '쏘카(SOCAR) 전기차 4시간 대여 50% 할인 쿠폰',
    price: '24,000원',
    originalPrice: '48,000원',
    discountRate: '50%',
    platform: '쏘카 제휴 프로모션',
    url: 'https://example.com/transport/socar',
    badge: '신규/기존 50% 할인',
    ctaText: '드라이브 쿠폰팩 받기',
  },
  '로지텍 MX Master 3S': {
    title: '로지텍 MX Master 3S 무소음 마우스 정품',
    price: '119,000원',
    originalPrice: '139,000원',
    discountRate: '14%',
    platform: '네이버 브랜드스토어',
    url: 'https://example.com/item/mx-master-3s',
    badge: '정품 공식인증',
    ctaText: '네이버페이 추가적립 최저가',
  },
  '넷플릭스 삼체': {
    title: '넷플릭스 오리지널 [삼체] 원작 소설 세트 (전3권)',
    price: '43,200원',
    originalPrice: '48,000원',
    discountRate: '10%',
    platform: '교보문고 제휴',
    url: 'https://example.com/content/3body-books',
    badge: '베스트셀러',
    ctaText: '도서 기획전 보러가기',
  }
};

export const INITIAL_DAILY_REVIEWS: DailyReview[] = [
  {
    id: 'rev-20260820',
    date: '2026-08-20',
    dayOfWeek: '목요일',
    author: {
      id: 'user-01',
      name: '리뷰어_제이콥',
      avatar: 'J',
      level: 'Lv.4 프로 기록러',
      badge: '🔥 19일 연속 기록'
    },
    overallRating: 4.5,
    summary: '오전엔 성수동에서 재택 근무하며 집중력을 최대로 끌어올렸고, 저녁엔 쏘카를 빌려 북악스카이웨이 드라이브를 다녀온 완벽한 밸런스의 하루. 소니 헤드폰 덕분에 카페 소음 속에서도 몰입할 수 있었음.',
    moodTags: ['#생산적인하루', '#카페재택', '#드라이브', '#힐링성공'],
    imagePlaceholder: '[대표 사진: 성수 카페 뷰 & 야경 드라이브 컷]',
    likesCount: 24,
    commentsCount: 5,
    createdAt: '2026-08-20T22:30:00Z',
    isToday: true,
    subReviews: [
      {
        id: 'sub-01',
        category: 'place',
        name: '성수 어니언 카페',
        rating: 4.5,
        comment: '베이커리 종류 다양하고 채광이 좋아서 작업하기 괜찮았음. 오후 2시 넘어서는 웨이팅 발생하니 오전에 방문 추천.',
        placeOrBrand: '서울 성동구 아차산로9길 8',
        verified: true,
        tags: ['#분위기좋은', '#베이커리맛집', '#작업하기좋은'],
        sponsoredInfo: SAMPLE_SPONSORED_PRESETS['성수 어니언 카페']
      },
      {
        id: 'sub-02',
        category: 'item',
        name: '소니 WH-1000XM5',
        rating: 5.0,
        comment: '카페 음악 소리와 주변 수다를 완전히 차단해 줌. 무게도 가볍고 통화 품질 개선되어 화상 미팅 때도 유용했음.',
        placeOrBrand: '소니 코리아',
        verified: true,
        tags: ['#노이즈캔슬링', '#재택필수템', '#음질최고'],
        sponsoredInfo: SAMPLE_SPONSORED_PRESETS['소니 WH-1000XM5']
      },
      {
        id: 'sub-03',
        category: 'transport',
        name: '쏘카 아이오닉 5',
        rating: 4.0,
        comment: '야간 드라이브용으로 3시간 대여. 가속감 부드럽고 실내 정숙성 뛰어남. 반납존 위치도 편리했음.',
        placeOrBrand: '쏘카존 (성수역 3번출구)',
        verified: true,
        tags: ['#카셰어링', '#전기차', '#야간드라이브'],
        sponsoredInfo: SAMPLE_SPONSORED_PRESETS['쏘카 아이오닉 5']
      }
    ]
  },
  {
    id: 'rev-20260819',
    date: '2026-08-19',
    dayOfWeek: '수요일',
    author: {
      id: 'user-02',
      name: '데스크테리어_민',
      avatar: 'M',
      level: 'Lv.3 테크 기록가',
      badge: '🔥 14일 연속 기록'
    },
    overallRating: 3.8,
    summary: '새로 장만한 무소음 마우스로 사무실 코딩 능률 상승! 다만 야근 때문에 저녁 운동을 못 가서 별점 반 개 차감. 퇴근 후 넷플릭스 신작 정주행으로 스트레스 해소함.',
    moodTags: ['#장비빨', '#데스크셋업', '#야근엔넷플릭스', '#평일일상'],
    imagePlaceholder: '[대표 사진: 새로 세팅한 듀얼 모니터 데스크]',
    likesCount: 18,
    commentsCount: 3,
    createdAt: '2026-08-19T23:10:00Z',
    subReviews: [
      {
        id: 'sub-04',
        category: 'item',
        name: '로지텍 MX Master 3S',
        rating: 5.0,
        comment: '사무실에서 클릭음 신경 안 쓰여서 너무 편함. 무한 휠 스크롤로 코드 리뷰할 때 생산성 2배 증가.',
        placeOrBrand: '로지텍 코리아',
        verified: true,
        tags: ['#개발자마우스', '#무소음', '#생산성'],
        sponsoredInfo: SAMPLE_SPONSORED_PRESETS['로지텍 MX Master 3S']
      },
      {
        id: 'sub-05',
        category: 'content',
        name: '넷플릭스 삼체',
        rating: 4.5,
        comment: '원작 소설의 방대한 SF 세계관을 영상으로 훌륭하게 구현함. 5화 카운트다운 연출 소름 돋음.',
        placeOrBrand: '넷플릭스 스트리밍',
        verified: false,
        tags: ['#SF드라마', '#주말정주행추천', '#넷플릭스'],
        sponsoredInfo: SAMPLE_SPONSORED_PRESETS['넷플릭스 삼체']
      }
    ]
  },
  {
    id: 'rev-20260818',
    date: '2026-08-18',
    dayOfWeek: '화요일',
    author: {
      id: 'user-03',
      name: '루틴러_하나',
      avatar: 'H',
      level: 'Lv.5 라이프 해커',
      badge: '👑 28일 연속 기록 (최장)'
    },
    overallRating: 5.0,
    summary: '새벽 러닝 5km 달성하고 출근길에 스타벅스 신메뉴 마시며 기분 좋게 시작한 완벽한 화요일. 점심시간 동료들과 나눈 대화까지 모든 게 긍정 에너지로 가득했던 하루!',
    moodTags: ['#오운완', '#미라클모닝', '#에너지충전', '#만점하루'],
    imagePlaceholder: '[대표 사진: 일출 러닝 & 스타벅스 텀블러 인증샷]',
    likesCount: 42,
    commentsCount: 9,
    createdAt: '2026-08-18T21:40:00Z',
    subReviews: [
      {
        id: 'sub-06',
        category: 'place',
        name: '스타벅스 강남대로점',
        rating: 4.5,
        comment: '오전 7시 오픈 직후라 여유롭고 사이렌오더 픽업 속도 최고. 좌석 간격도 쾌적함.',
        placeOrBrand: '서울 서초구 강남대로',
        verified: true,
        tags: ['#아침루틴', '#사이렌오더', '#쾌적한매장'],
        sponsoredInfo: SAMPLE_SPONSORED_PRESETS['스타벅스 아메리카노']
      }
    ]
  }
];

// 실시간 최다 언급 서브 리뷰 (언급 빈도 및 내돈내산 인증 건수 기반 큐레이션)
export const POPULAR_CURATIONS: CurationItem[] = [
  {
    id: 'cur-01',
    category: 'item',
    name: '소니 WH-1000XM5 헤드폰',
    averageRating: 4.9,
    reviewCount: 342,
    trendBadge: '🔥 이번 주 342명의 일기에 등장',
    highlightQuote: '"카페 작업 시 소음 차단 능력과 통화품질 모두 만족 (내돈내산 인증 92%)"',
    sponsoredInfo: SAMPLE_SPONSORED_PRESETS['소니 WH-1000XM5'],
    imagePlaceholder: '[아이템 이미지: 소니 WH-1000XM5]'
  },
  {
    id: 'cur-02',
    category: 'place',
    name: '성수 어니언 카페 & 베이커리',
    averageRating: 4.6,
    reviewCount: 289,
    trendBadge: '📍 이번 주 289명의 하루에 등장',
    highlightQuote: '"넓은 통유리 채광과 시그니처 팡도르가 만족스러운 곳"',
    sponsoredInfo: SAMPLE_SPONSORED_PRESETS['성수 어니언 카페'],
    imagePlaceholder: '[장소 이미지: 성수 어니언]'
  },
  {
    id: 'cur-03',
    category: 'item',
    name: '로지텍 MX Master 3S 마우스',
    averageRating: 4.8,
    reviewCount: 195,
    trendBadge: '💻 재택/오피스 최다 언급 아이템',
    highlightQuote: '"무소음 클릭과 커스텀 제스처 버튼으로 작업 피로도 대폭 감소"',
    sponsoredInfo: SAMPLE_SPONSORED_PRESETS['로지텍 MX Master 3S'],
    imagePlaceholder: '[아이템 이미지: 로지텍 MX Master 3S]'
  },
  {
    id: 'cur-04',
    category: 'transport',
    name: '쏘카(SOCAR) 전기차 라인업',
    averageRating: 4.5,
    reviewCount: 154,
    trendBadge: '🚗 드라이브 리뷰 최다 대여',
    highlightQuote: '"가까운 쏘카존에서 즉시 비대면 픽업하고 정숙한 주행감 만족"',
    sponsoredInfo: SAMPLE_SPONSORED_PRESETS['쏘카 아이오닉 5'],
    imagePlaceholder: '[이동수단 이미지: 쏘카 EV 차량]'
  }
];

// 꾸준한 기록 스트릭(Streak) 챌린저 목록
export const STREAK_CHALLENGERS = [
  {
    author: {
      name: '루틴러_하나',
      level: 'Lv.5 라이프 해커',
      avatar: 'H',
      badge: '👑 28일 연속 기록'
    },
    streakDays: 28,
    totalDailyReviews: 28,
    totalSubReviews: 84,
    recentMood: '#미라클모닝',
    cheerCount: 128
  },
  {
    author: {
      name: '리뷰어_제이콥',
      level: 'Lv.4 프로 기록러',
      avatar: 'J',
      badge: '🥈 19일 연속 기록'
    },
    streakDays: 19,
    totalDailyReviews: 26,
    totalSubReviews: 78,
    recentMood: '#생산적인하루',
    cheerCount: 94
  },
  {
    author: {
      name: '데스크테리어_민',
      level: 'Lv.3 테크 기록가',
      avatar: 'M',
      badge: '🥉 14일 연속 기록'
    },
    streakDays: 14,
    totalDailyReviews: 22,
    totalSubReviews: 61,
    recentMood: '#장비빨',
    cheerCount: 72
  },
  {
    author: {
      name: '미식탐험가_수진',
      level: 'Lv.3 맛집 아카이빙',
      avatar: 'S',
      badge: '🔥 11일 연속 기록'
    },
    streakDays: 11,
    totalDailyReviews: 19,
    totalSubReviews: 55,
    recentMood: '#카페투어',
    cheerCount: 51
  },
  {
    author: {
      name: '캠퍼_진우',
      level: 'Lv.2 아웃도어 러버',
      avatar: 'W',
      badge: '🔥 7일 연속 기록'
    },
    streakDays: 7,
    totalDailyReviews: 15,
    totalSubReviews: 39,
    recentMood: '#힐링성공',
    cheerCount: 38
  }
];

// 라이프스타일 테마별 모아보기 태그
export const LIFESTYLE_THEMES = [
  { id: 'all', label: '전체 둘러보기', count: '1.2k+' },
  { id: 'work', label: '💻 재택 & 생산성 데이', count: '342' },
  { id: 'cafe', label: '☕ 주말 카페 & 핫플', count: '489' },
  { id: 'routine', label: '🏃 오운완 & 미라클모닝', count: '215' },
  { id: 'drive', label: '🚗 야간 드라이브 & 여행', count: '178' },
  { id: 'healing', label: '🎬 집콕 넷플릭스 & 휴식', count: '164' }
];
