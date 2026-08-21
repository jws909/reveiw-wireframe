import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useReviewContext } from '../context/ReviewContext';
import { SubReviewCategory, SubReview } from '../types/review';
import { StarRating } from '../components/common/StarRating';
import { CategoryBadge, MoodBadge } from '../components/common/Badge';
import { DailyReviewCard } from '../components/feed/DailyReviewCard';
import { 
  User, 
  Calendar, 
  Flame, 
  Star, 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  Trash2, 
  ExternalLink, 
  Heart, 
  Search, 
  Award,
  BookOpen,
  Coffee,
  Laptop,
  Car,
  Clapperboard,
  ArrowRight,
  Edit3
} from 'lucide-react';

type MyTab = 'daily' | 'subreviews' | 'liked';

export const MyPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { dailyReviews, deleteDailyReview, likedReviews } = useReviewContext();

  const [activeTab, setActiveTab] = useState<MyTab>('daily');
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');

  // Filter daily reviews written by current user
  const myReviews = useMemo(() => {
    if (!user) return [];
    return dailyReviews.filter(
      (rev) => rev.author.id === user.id || rev.author.name === user.name
    );
  }, [dailyReviews, user]);

  // Liked reviews
  const myLikedReviews = useMemo(() => {
    return dailyReviews.filter((rev) => !!likedReviews[rev.id]);
  }, [dailyReviews, likedReviews]);

  // All sub-reviews written by the user flattened
  const mySubReviews = useMemo(() => {
    const subs: { parentDate: string; parentId: string; sub: SubReview }[] = [];
    myReviews.forEach((review) => {
      review.subReviews.forEach((sub) => {
        subs.push({
          parentDate: review.date,
          parentId: review.id,
          sub
        });
      });
    });
    return subs;
  }, [myReviews]);

  // Calculated Stats
  const totalReviewsCount = myReviews.length;
  const totalSubReviewsCount = mySubReviews.length;
  const avgRating = totalReviewsCount > 0
    ? (myReviews.reduce((acc, r) => acc + r.overallRating, 0) / totalReviewsCount).toFixed(1)
    : '0.0';

  const verifiedSubReviewsCount = mySubReviews.filter((item) => item.sub.verified).length;
  const verificationRate = totalSubReviewsCount > 0
    ? Math.round((verifiedSubReviewsCount / totalSubReviewsCount) * 100)
    : 0;

  // Category breakdown
  const categoryCounts = useMemo(() => {
    const counts: Record<SubReviewCategory, number> = {
      place: 0,
      item: 0,
      transport: 0,
      content: 0
    };
    mySubReviews.forEach(({ sub }) => {
      if (counts[sub.category] !== undefined) {
        counts[sub.category]++;
      }
    });
    return counts;
  }, [mySubReviews]);

  // Filtered Daily Reviews for display
  const filteredMyReviews = useMemo(() => {
    return myReviews
      .filter((rev) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          rev.summary.toLowerCase().includes(q) ||
          rev.date.includes(q) ||
          rev.moodTags.some((tag) => tag.toLowerCase().includes(q)) ||
          rev.subReviews.some((sub) => sub.name.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.overallRating - a.overallRating;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [myReviews, searchQuery, sortBy]);

  // Filtered Sub-reviews for display
  const filteredSubReviews = useMemo(() => {
    return mySubReviews.filter(({ sub }) => {
      if (subCategoryFilter === 'all') return true;
      return sub.category === subCategoryFilter;
    });
  }, [mySubReviews, subCategoryFilter]);

  const handleDeleteReview = (id: string, date: string) => {
    if (window.confirm(`정말로 ${date} 데일리 기록을 삭제하시겠습니까?`)) {
      deleteDailyReview(id);
      alert('기록이 삭제되었습니다.');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-8 sm:p-12 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            로그인이 필요한 페이지입니다
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            내 데일리 기록과 서브 리뷰 분석 통계를 확인하려면 로그인 또는 회원가입을 진행해주세요.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              로그인하기
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. User Profile & Summary Card */}
      <section className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-dashed border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-white font-mono font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-md shrink-0">
              {user.avatar}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {user.level}
                </span>
                <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  {user.streakDays}일 연속 기록
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {user.email}
              </p>
              <div className="text-xs text-slate-600 pt-0.5 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>하루 라이프스타일 1:N 아카이빙 중</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/write"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>오늘의 하루 쓰기</span>
            </Link>
            <button
              onClick={() => alert(`[와이어프레임] ${user.name} 님의 프로필 수정 모달입니다.`)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-300 font-mono"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>프로필 수정</span>
            </button>
            <button
              onClick={logout}
              className="px-3 py-2.5 text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-mono"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 2. Key Analytics / Metrics Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-bold">총 데일리 기록</span>
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {totalReviewsCount}
              </span>
              <span className="text-xs text-slate-500">편</span>
            </div>
            <p className="text-[10px] text-slate-400">누적 하루 일기</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-bold">내 평균 하루 평점</span>
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-600 font-mono">
                {avgRating}
              </span>
              <span className="text-xs text-slate-500">/ 5.0</span>
            </div>
            <p className="text-[10px] text-slate-400">삶의 만족도 지표</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-bold">총 서브 리뷰</span>
              <Layers className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-blue-600 font-mono">
                {totalSubReviewsCount}
              </span>
              <span className="text-xs text-slate-500">개</span>
            </div>
            <p className="text-[10px] text-slate-400">장소/아이템 세부평</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-bold">내돈내산 인증률</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {verificationRate}%
              </span>
              <span className="text-xs text-slate-500">({verifiedSubReviewsCount}개)</span>
            </div>
            <p className="text-[10px] text-slate-400">영수증 인증 완료</p>
          </div>
        </div>

        {/* Category breakdown pill stats */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-bold text-slate-700 flex items-center gap-1 font-mono">
            <Award className="w-3.5 h-3.5 text-blue-600" /> 카테고리별 기록 분포:
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-mono">
            장소 {categoryCounts.place}개
          </span>
          <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded text-[11px] font-mono">
            아이템 {categoryCounts.item}개
          </span>
          <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-mono">
            이동수단 {categoryCounts.transport}개
          </span>
          <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded text-[11px] font-mono">
            콘텐츠 {categoryCounts.content}개
          </span>
        </div>
      </section>

      {/* 3. Tab Navigation */}
      <div className="border-b-2 border-dashed border-slate-300">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'daily'
                ? 'border-slate-900 text-slate-900 bg-white rounded-t-lg border-t-2 border-x-2 border-dashed border-b-transparent -mb-0.5 shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-lg'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>내 데일리 기록</span>
            <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
              {myReviews.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subreviews')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'subreviews'
                ? 'border-slate-900 text-slate-900 bg-white rounded-t-lg border-t-2 border-x-2 border-dashed border-b-transparent -mb-0.5 shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-lg'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>내 서브 리뷰 모아보기</span>
            <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
              {mySubReviews.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('liked')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'liked'
                ? 'border-slate-900 text-slate-900 bg-white rounded-t-lg border-t-2 border-x-2 border-dashed border-b-transparent -mb-0.5 shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-lg'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>좋아요한 리뷰</span>
            <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
              {myLikedReviews.length}
            </span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content */}
      {/* TAB 1: 내 데일리 기록 */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          {/* Controls: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="내 기록 검색 (총평 내용, 날짜, 태그, 서브리뷰 항목)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-900"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 border border-slate-300 rounded-lg p-1 bg-slate-50 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSortBy('latest')}
                  className={`px-2.5 py-1 rounded ${
                    sortBy === 'latest'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  최신순
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('rating')}
                  className={`px-2.5 py-1 rounded ${
                    sortBy === 'rating'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  평점순
                </button>
              </div>
            </div>
          </div>

          {/* Daily Reviews List */}
          {filteredMyReviews.length === 0 ? (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto font-mono">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {searchQuery ? '검색된 내 하루 기록이 없습니다' : '아직 작성된 데일리 리뷰가 없습니다'}
                </h3>
                <p className="text-xs text-slate-500">
                  {searchQuery
                    ? '다른 검색어로 검색해보시거나 검색어를 비워주세요.'
                    : '오늘 하루의 삶과 경험을 첫 번째로 기록해보세요!'}
                </p>
              </div>
              {!searchQuery && (
                <Link
                  to="/write"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>오늘 하루 기록하기</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredMyReviews.map((review) => (
                <div key={review.id} className="relative group">
                  {/* Card with extra action toolbar for author */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all hover:border-slate-400 space-y-4">
                    {/* Header with Date & Manage Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                          {review.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">
                              {review.author.name}
                            </span>
                            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                              내 글
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-mono font-medium">{review.date} ({review.dayOfWeek})</span>
                            {review.isToday && (
                              <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                                TODAY
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Overall Rating & Actions */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200">
                          <StarRating rating={review.overallRating} size="sm" />
                          <span className="font-bold text-amber-900 text-sm font-mono">
                            {review.overallRating.toFixed(1)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteReview(review.id, review.date)}
                          title="기록 삭제"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {review.summary}
                      </p>

                      {/* Mood tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {review.moodTags.map((tag) => (
                          <MoodBadge key={tag} tag={tag} size="sm" />
                        ))}
                      </div>
                    </div>

                    {/* Image Placeholder */}
                    {review.imagePlaceholder && (
                      <div className="border border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 text-center text-xs font-mono text-slate-400">
                        {review.imagePlaceholder}
                      </div>
                    )}

                    {/* Sub-reviews Summary Ribbon */}
                    <div className="pt-2 border-t border-dashed border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-blue-600" />
                          포함된 서브 리뷰 ({review.subReviews.length}):
                        </span>
                        {review.subReviews.map((sub) => (
                          <span
                            key={sub.id}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-700 font-mono"
                          >
                            <span>{sub.name}</span>
                            <span className="text-amber-600 font-bold">★{sub.rating}</span>
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/review/${review.id}`}
                        className="inline-flex items-center justify-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors shrink-0"
                      >
                        <span>전체 상세 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: 내 서브 리뷰 모아보기 */}
      {activeTab === 'subreviews' && (
        <div className="space-y-6">
          {/* Sub-Review Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            <button
              type="button"
              onClick={() => setSubCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                subCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
              }`}
            >
              전체 카테고리 ({mySubReviews.length})
            </button>
            <button
              type="button"
              onClick={() => setSubCategoryFilter('place')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                subCategoryFilter === 'place'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>장소·식당 ({categoryCounts.place})</span>
            </button>
            <button
              type="button"
              onClick={() => setSubCategoryFilter('item')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                subCategoryFilter === 'item'
                  ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                  : 'bg-white text-sky-700 border-sky-300 hover:bg-sky-50'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>아이템·장비 ({categoryCounts.item})</span>
            </button>
            <button
              type="button"
              onClick={() => setSubCategoryFilter('transport')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                subCategoryFilter === 'transport'
                  ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                  : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>이동수단·차량 ({categoryCounts.transport})</span>
            </button>
            <button
              type="button"
              onClick={() => setSubCategoryFilter('content')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                subCategoryFilter === 'content'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-50'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>미디어·콘텐츠 ({categoryCounts.content})</span>
            </button>
          </div>

          {filteredSubReviews.length === 0 ? (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-12 text-center space-y-4">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  해당 카테고리의 서브 리뷰가 없습니다
                </h3>
                <p className="text-xs text-slate-500">
                  데일리 리뷰 작성 시 서브 리뷰 항목을 추가해보세요.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubReviews.map(({ parentDate, parentId, sub }) => (
                <div
                  key={sub.id}
                  className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-5 shadow-sm space-y-3 hover:border-slate-400 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <CategoryBadge category={sub.category} size="sm" />
                      <div className="flex items-center gap-2">
                        {sub.verified && (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            <ShieldCheck className="w-3 h-3" />
                            내돈내산
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-400">
                          {parentDate} 기록
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900">
                          {sub.name}
                        </h4>
                        <div className="flex items-center gap-1 text-amber-600 font-mono font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{sub.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      {sub.placeOrBrand && (
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {sub.placeOrBrand}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      "{sub.comment}"
                    </p>

                    {sub.tags && sub.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {sub.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Connected Sponsored Link Preview if present */}
                  {sub.sponsoredInfo && (
                    <div className="p-2.5 bg-amber-50/70 border border-dashed border-amber-200 rounded-lg text-xs flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-amber-700 font-mono uppercase bg-amber-200/60 px-1 rounded mr-1">
                          BM 제휴
                        </span>
                        <span className="font-bold text-slate-800 text-[11px] truncate inline-block align-middle max-w-[160px]">
                          {sub.sponsoredInfo.title}
                        </span>
                        <span className="text-rose-600 font-bold text-[11px] ml-1 font-mono">
                          {sub.sponsoredInfo.price}
                        </span>
                      </div>
                      <a
                        href={sub.sponsoredInfo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        <span>최저가</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 text-right">
                    <Link
                      to={`/review/${parentId}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900"
                    >
                      <span>해당 하루 리뷰 전체 보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: 좋아요한 리뷰 */}
      {activeTab === 'liked' && (
        <div className="space-y-6">
          {myLikedReviews.length === 0 ? (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-12 text-center space-y-4">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  아직 좋아요를 누른 리뷰가 없습니다
                </h3>
                <p className="text-xs text-slate-500">
                  피드나 탐색 탭에서 인상 깊은 하루 기록에 하트를 눌러보세요.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                <span>피드 둘러보기</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {myLikedReviews.map((review) => (
                <DailyReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default MyPage;
