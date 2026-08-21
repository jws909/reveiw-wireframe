import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReviewContext } from '../context/ReviewContext';
import { DailyReviewCard } from '../components/feed/DailyReviewCard';
import { FeedSidebar } from '../components/feed/FeedSidebar';
import { 
  PlusCircle, 
  Sparkles, 
  SlidersHorizontal, 
  Layers
} from 'lucide-react';

export const FeedPage: React.FC = () => {
  const { dailyReviews } = useReviewContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');

  // Filter reviews
  const filteredReviews = dailyReviews.filter((review) => {
    if (selectedCategory === 'all') return true;
    return review.subReviews.some((sub) => sub.category === selectedCategory);
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.overallRating - a.overallRating;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner / Concept Wireframe Intro */}
      <section className="border-2 border-dashed border-slate-300 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-xs font-mono px-2.5 py-1 rounded-full border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RE:DAY 데일리 라이프 리뷰 와이어프레임</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              오늘 하루의 평점과 경험을 기록하세요
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              하루 전체의 삶을 별점으로 기록하고, 방문한 맛집/사용한 전자기기/탑승한 차량 등 세부 서브 리뷰(1:N)를 함께 남겨보세요.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/write"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>오늘의 하루 리뷰 작성하기</span>
            </Link>
          </div>
        </div>

        {/* Blueprint background grid accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-slate-100 wireframe-grid pointer-events-none hidden md:block" />
      </section>

      {/* Main Content Layout: Feed list + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline Feed */}
        <main className="lg:col-span-8 space-y-6">
          {/* Feed Filter & Sorting Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border-2 border-dashed border-slate-300 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 pl-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                정렬
              </span>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setSortBy('latest')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    sortBy === 'latest'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  최신 날짜순
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    sortBy === 'rating'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  하루 평점 높은순
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              총 <strong className="text-slate-900">{sortedReviews.length}</strong>개의 하루 리뷰
            </div>
          </div>

          {/* Active Category Filter Tag if selected */}
          {selectedCategory !== 'all' && (
            <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-dashed border-blue-300 rounded-lg text-xs text-blue-900">
              <span className="flex items-center gap-1.5 font-medium">
                <Layers className="w-4 h-4 text-blue-600" />
                카테고리 필터 적용 중: <strong>{selectedCategory}</strong>
              </span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-blue-700 hover:text-blue-900 font-bold underline"
              >
                필터 초기화
              </button>
            </div>
          )}

          {/* Daily Review Card List */}
          <div className="space-y-6">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <DailyReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-white p-8">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">등록된 리뷰가 없습니다</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  선택한 필터 조건에 해당하는 하루 리뷰가 없거나 아직 작성되지 않았습니다.
                </p>
                <Link
                  to="/write"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                >
                  <PlusCircle className="w-4 h-4" />
                  첫 하루 리뷰 작성하기
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* Right Column: Statistics, Filters, BM Banner */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <FeedSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
