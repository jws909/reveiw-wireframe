import React from 'react';
import { SubReview } from '../../types/review';
import { CategoryBadge, MoodBadge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { SponsoredBox } from './SponsoredBox';
import { CheckCircle2, MapPin } from 'lucide-react';

interface SubReviewCardProps {
  subReview: SubReview;
  showSponsored?: boolean;
  onDelete?: () => void;
  isEditing?: boolean;
}

export const SubReviewCard: React.FC<SubReviewCardProps> = ({
  subReview,
  showSponsored = true,
  onDelete,
  isEditing = false
}) => {
  return (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-white/90 shadow-sm space-y-3 relative group transition-all hover:border-slate-400">
      {/* Top row: Category, Verified mark, Delete button if editing */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CategoryBadge category={subReview.category} />
          {subReview.verified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              내돈내산 인증
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <StarRating rating={subReview.rating} size="sm" showScoreText />
          {isEditing && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-0.5 border border-dashed border-rose-300 rounded bg-rose-50 hover:bg-rose-100 transition-colors"
            >
              삭제
            </button>
          )}
        </div>
      </div>

      {/* Sub-item Title & Brand/Place */}
      <div>
        <h4 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
          {subReview.name}
        </h4>
        {subReview.placeOrBrand && (
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{subReview.placeOrBrand}</span>
          </p>
        )}
      </div>

      {/* Comment / Review text */}
      <p className="text-sm text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed font-sans">
        {subReview.comment}
      </p>

      {/* Tags */}
      {subReview.tags && subReview.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {subReview.tags.map((tag, idx) => (
            <MoodBadge key={idx} tag={tag} size="sm" />
          ))}
        </div>
      )}

      {/* Sponsored Box (BM) */}
      {showSponsored && subReview.sponsoredInfo && (
        <div className="pt-2">
          <SponsoredBox sponsored={subReview.sponsoredInfo} itemName={subReview.name} />
        </div>
      )}
    </div>
  );
};
