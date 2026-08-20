import React from 'react';
import { Link } from 'react-router-dom';
import { DailyReview } from '../../types/review';
import { StarRating } from '../common/StarRating';
import { MoodBadge, CategoryBadge } from '../common/Badge';
import { PlaceholderBox } from '../common/PlaceholderBox';
import { useReviewContext } from '../../context/ReviewContext';
import { 
  Heart, 
  MessageSquare, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  CheckCircle2 
} from 'lucide-react';

interface DailyReviewCardProps {
  review: DailyReview;
}

export const DailyReviewCard: React.FC<DailyReviewCardProps> = ({ review }) => {
  const { toggleLike, likedReviews } = useReviewContext();
  const isLiked = !!likedReviews[review.id];

  // Check if any subReviews have sponsored links
  const sponsoredItems = review.subReviews.filter(s => !!s.sponsoredInfo);

  return (
    <article className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all hover:border-slate-400 space-y-4">
      {/* Header: Date, Author, Overall Score */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm">
            {review.author.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                {review.author.name}
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                {review.author.level}
              </span>
              {review.author.badge && (
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  {review.author.badge}
                </span>
              )}
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

        {/* Daily Overall Rating Highlight */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
              오늘의 하루 평점
            </span>
            <StarRating rating={review.overallRating} size="sm" showScoreText />
          </div>
        </div>
      </div>

      {/* Mood Tags */}
      {review.moodTags && review.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.moodTags.map((tag, idx) => (
            <MoodBadge key={idx} tag={tag} size="sm" />
          ))}
        </div>
      )}

      {/* Daily Summary */}
      <div className="space-y-2">
        <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed line-clamp-3">
          {review.summary}
        </p>
      </div>

      {/* Representative Image Placeholder */}
      <div className="pt-1">
        <PlaceholderBox
          label={review.imagePlaceholder || '[오늘 하루 대표 이미지 영역]'}
          height="h-32"
          subText="일기 대표 컷 / 장소 뷰 / 하이라이트 사진"
        />
      </div>

      {/* Sub-reviews Summary List (1:N structure showcase) */}
      <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>이 날의 서브 리뷰 ({review.subReviews.length}개)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            클릭하여 상세 평가 보기
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {review.subReviews.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200 text-xs shadow-2xs"
            >
              <div className="flex items-center gap-1.5 truncate max-w-[70%]">
                <CategoryBadge category={sub.category} size="sm" />
                <span className="font-semibold text-slate-800 truncate">
                  {sub.name}
                </span>
                {sub.verified && (
                  <span title="내돈내산 인증">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  </span>
                )}
              </div>
              <div className="shrink-0 flex items-center">
                <StarRating rating={sub.rating} size="sm" />
                <span className="text-[11px] font-mono font-bold text-slate-600 ml-1">
                  {sub.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BM Sponsored Chips Area */}
      {sponsoredItems.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            연계 제휴 상품
          </span>
          {sponsoredItems.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 text-xs bg-amber-50 text-amber-900 border border-dashed border-amber-300 px-2 py-0.5 rounded font-medium"
            >
              <span className="text-slate-600">{item.name}:</span>
              <span className="font-bold text-amber-700">{item.sponsoredInfo?.price}</span>
              <span className="text-[10px] text-slate-400 font-normal">({item.sponsoredInfo?.platform})</span>
            </span>
          ))}
        </div>
      )}

      {/* Footer: Like, Comment, Detail Link */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleLike(review.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-colors ${
              isLiked
                ? 'bg-rose-50 border-rose-300 text-rose-600 font-semibold'
                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{review.likesCount}</span>
          </button>

          <Link
            to={`/review/${review.id}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            <span>댓글 {review.commentsCount}</span>
          </Link>
        </div>

        <Link
          to={`/review/${review.id}`}
          className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 group px-2 py-1"
        >
          <span>하루 리뷰 & 서브 리뷰 상세 보기</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
