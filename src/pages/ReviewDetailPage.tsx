import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReviewContext } from '../context/ReviewContext';
import { StarRating } from '../components/common/StarRating';
import { MoodBadge } from '../components/common/Badge';
import { SubReviewCard } from '../components/review/SubReviewCard';
import { SponsoredBox } from '../components/review/SponsoredBox';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { 
  ArrowLeft, 
  Calendar, 
  Heart, 
  Share2, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  Send,
  PlusCircle
} from 'lucide-react';

export const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDailyReviewById, toggleLike, likedReviews } = useReviewContext();

  const review = id ? getDailyReviewById(id) : undefined;
  const isLiked = id ? !!likedReviews[id] : false;

  if (!review) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-white space-y-3">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">리뷰를 찾을 수 없습니다</h2>
          <p className="text-sm text-slate-500">
            요청하신 데일리 리뷰가 삭제되었거나 존재하지 않는 ID입니다.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>피드로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  // All sponsored items in this review
  const allSponsored = review.subReviews.filter((s) => !!s.sponsoredInfo);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Navigation & Actions */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed border-slate-300">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>목록으로</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleLike(review.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              isLiked
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>좋아요 {review.likesCount}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('리뷰 링크가 클립보드에 복사되었습니다.');
              }
            }}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="공유하기"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. Main Daily Review Detail Section */}
      {/* ========================================================================= */}
      <article className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Header: Author + Date + Overall Rating */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-base shadow">
              {review.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  {review.author.name}
                </h3>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {review.author.level}
                </span>
                {review.author.badge && (
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {review.author.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono font-medium">{review.date} ({review.dayOfWeek})</span>
              </div>
            </div>
          </div>

          {/* Daily Overall Score Large Box */}
          <div className="flex flex-col sm:items-end bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">
              오늘 하루 종합 평점
            </span>
            <StarRating rating={review.overallRating} size="lg" showScoreText />
          </div>
        </div>

        {/* Mood Tags */}
        {review.moodTags && review.moodTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {review.moodTags.map((tag, idx) => (
              <MoodBadge key={idx} tag={tag} size="md" />
            ))}
          </div>
        )}

        {/* Daily Summary Body */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Daily Summary (오늘 하루 총평)
          </h4>
          <p className="text-base text-slate-800 leading-relaxed font-sans bg-slate-50/60 p-4 rounded-xl border border-slate-200 whitespace-pre-line">
            {review.summary}
          </p>
        </div>

        {/* Representative Image Placeholder */}
        <div className="pt-2">
          <PlaceholderBox
            label={review.imagePlaceholder || '[오늘 하루 대표 이미지 영역]'}
            height="h-56"
            subText="하루의 대표 하이라이트 사진 / 영수증 인증 샷"
          />
        </div>
      </article>

      {/* ========================================================================= */}
      {/* 2. Sub-Reviews Section (1 : N 세부 리뷰 카드) */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              이 날의 세부 서브 리뷰 ({review.subReviews.length}개)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            1:N 세부 리뷰 카드 목록
          </span>
        </div>

        <div className="space-y-4">
          {review.subReviews.map((sub) => (
            <SubReviewCard key={sub.id} subReview={sub} showSponsored={true} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BM Sponsored Overview Box (이 날의 연계 제휴 상품 모아보기) */}
      {/* ========================================================================= */}
      {allSponsored.length > 0 && (
        <section className="border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/40 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-amber-950">
                BM 제휴 큐레이션: 이 날의 추천 아이템 & 장소 최저가
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
              제휴 파트너스 연동
            </span>
          </div>

          <p className="text-xs text-amber-800 leading-relaxed">
            리뷰어가 직접 경험하고 높은 평점을 남긴 장소/아이템의 실시간 최저가 및 예약 링크입니다. 구매 및 예약 시 플랫폼과 리뷰어에게 소정의 리워드가 제공됩니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {allSponsored.map((sub) => (
              sub.sponsoredInfo && (
                <SponsoredBox
                  key={sub.id}
                  sponsored={sub.sponsoredInfo}
                  itemName={sub.name}
                  variant="card"
                />
              )
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. Comments / Social Skeleton Section */}
      {/* ========================================================================= */}
      <section className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <h4 className="text-sm font-bold text-slate-800">
              댓글 및 반응 ({review.commentsCount})
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">와이어프레임 영역</span>
        </div>

        {/* Mock comment */}
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">테크러버_진</span>
              <span className="text-[10px] text-slate-400 font-mono">2시간 전</span>
            </div>
            <p className="text-slate-600">
              소니 헤드폰 실사용 평점 정말 공감되네요! 저도 카페에서 작업할 때 필수템으로 쓰고 있습니다.
            </p>
          </div>
        </div>

        {/* Comment Input Skeleton */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="이 날의 하루에 응원의 한마디나 질문을 남겨보세요..."
            className="flex-1 px-3 py-2 text-xs border border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-700"
          />
          <button
            type="button"
            onClick={() => alert('와이어프레임 프로토타입입니다.')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800"
          >
            <Send className="w-3 h-3" />
            <span>등록</span>
          </button>
        </div>
      </section>

      {/* Floating CTA Banner */}
      <div className="border-2 border-dashed border-blue-300 rounded-xl bg-blue-50/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-blue-950">
          <strong>나의 하루도 기록해 볼까요?</strong> 오늘 있었던 일과 서브 리뷰를 남겨보세요.
        </div>
        <Link
          to="/write"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>오늘 리뷰 작성하기</span>
        </Link>
      </div>
    </div>
  );
};
