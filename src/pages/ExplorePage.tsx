import React, { useState } from 'react';
import { STREAK_CHALLENGERS, POPULAR_CURATIONS, LIFESTYLE_THEMES } from '../data/mockData';
import { StreakChallengerCard } from '../components/explore/RankingItem';
import { CurationCard } from '../components/explore/CurationCard';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Compass, 
  ShoppingBag, 
  ExternalLink,
  CalendarCheck2
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const filteredCurations = POPULAR_CURATIONS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header Banner */}
      <section className="border-2 border-dashed border-slate-300 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-mono px-2.5 py-1 rounded-full border border-indigo-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>라이프스타일 탐색 & 트렌드</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          다른 사람들의 하루와 실제 라이프 트렌드를 탐색하세요
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          주관적인 평점 순위 대신, <strong>꾸준히 기록을 이어가는 챌린저들</strong>과 유저들의 일기에 <strong>가장 많이 등장한 실사용 장소·아이템 트렌드</strong>를 확인해보세요.
        </p>
      </section>

      {/* Theme Filters (라이프스타일 테마별 하루 엿보기) */}
      <section className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>라이프스타일 테마별 하루 엿보기</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            관심 있는 키워드로 둘러보기
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {LIFESTYLE_THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setSelectedTheme(theme.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedTheme === theme.id
                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{theme.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                selectedTheme === theme.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {theme.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Grid: 2 Columns - Streak Challengers & Trending Mentions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-w-0">
        {/* ========================================================================= */}
        {/* 1. Daily Logging Streak Challengers (연속 기록 챌린지) */}
        {/* ========================================================================= */}
        <section className="lg:col-span-5 space-y-4 min-w-0">
          <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-slate-300">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-slate-900">
                연속 기록 스트릭(Streak)
              </h2>
            </div>
            <span className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              꾸준한 기록러
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            평점이 아닌 <strong>매일 하루를 빼놓지 않고 기록</strong>하며 삶을 성실히 채워가는 유저들입니다.
          </p>

          <div className="space-y-3 min-w-0">
            {STREAK_CHALLENGERS.map((user) => (
              <StreakChallengerCard
                key={user.author.name}
                author={user.author}
                streakDays={user.streakDays}
                totalDailyReviews={user.totalDailyReviews}
                totalSubReviews={user.totalSubReviews}
                recentMood={user.recentMood}
                cheerCount={user.cheerCount}
              />
            ))}
          </div>

          {/* Streak Info Box */}
          <div className="p-4 bg-orange-50/60 border border-dashed border-orange-300 rounded-xl text-xs text-orange-950 space-y-1.5 min-w-0">
            <div className="flex items-center gap-1.5 font-bold">
              <CalendarCheck2 className="w-4 h-4 text-orange-600" />
              <span>나도 스트릭 챌린지 시작하기</span>
            </div>
            <p className="text-[11px] text-orange-800 leading-relaxed">
              오늘의 하루를 리뷰하면 1일차 불꽃 뱃지가 활성화됩니다. 7일 연속 작성 시 '주간 루틴 마스터' 뱃지가 부여됩니다.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. Trending Mentions in Daily Reviews (이번 주 최다 언급 트렌드) */}
        {/* ========================================================================= */}
        <section className="lg:col-span-7 space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-dashed border-slate-300">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                이번 주 최다 언급 아이템 & 장소
              </h2>
            </div>
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              실사용 데이터 기반
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            단순 주관적 별점이 아닌, <strong>실제 유저들의 일기 속에 가장 많이 기록되고 내돈내산 인증된</strong> 핫 아이템/장소입니다.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {[
              { id: 'all', label: '전체 트렌드' },
              { id: 'item', label: '💻 전자기기/아이템' },
              { id: 'place', label: '☕ 핫플 장소/카페' },
              { id: 'transport', label: '🚗 모빌리티/차량' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Curation Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {filteredCurations.map((item) => (
              <CurationCard key={item.id} item={item} />
            ))}
          </div>

          {/* BM Exhibition Banner Box */}
          <div className="border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-amber-950">
                  BM 스폰서드 기획전: 일기 속 '최다 언급 핫템' 특가전
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded">
                제휴 특별전
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              이번 주 수백 명의 일기에 등장한 <strong>실사용 검증 완료 아이템</strong>들을 제휴 파트너스 최저가로 만나보세요.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => alert('[BM 시뮬레이션] 최다 언급 핫템 기획전 페이지로 이동합니다.')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1"
              >
                <span>실사용 검증 핫템 기획전 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
