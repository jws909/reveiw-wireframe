import React from 'react';
import { CurationItem } from '../../types/review';
import { CategoryBadge } from '../common/Badge';
import { SponsoredBox } from '../review/SponsoredBox';
import { PlaceholderBox } from '../common/PlaceholderBox';
import { MessageSquareQuote, Users } from 'lucide-react';

interface CurationCardProps {
  item: CurationItem;
}

export const CurationCard: React.FC<CurationCardProps> = ({ item }) => {
  return (
    <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all hover:border-slate-400 flex flex-col justify-between overflow-hidden min-w-0 w-full">
      <div className="space-y-3.5 min-w-0">
        {/* Category and Mention Trend Badge */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 min-w-0">
          <CategoryBadge category={item.category} size="sm" />
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
            <Users className="w-3 h-3 text-blue-500 shrink-0" />
            <span>{item.trendBadge}</span>
          </span>
        </div>

        {/* Image Placeholder */}
        <PlaceholderBox
          label={item.imagePlaceholder}
          height="h-32 sm:h-36"
          subText="유저들의 일기 속 실제 활용 컷"
        />

        {/* Item Title & Mention Stats */}
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate" title={item.name}>
            {item.name}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            누적 <strong className="text-slate-800">{item.reviewCount}명</strong>의 하루 리뷰에 기록됨
          </p>
        </div>

        {/* Highlight Quote from real logs */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed flex items-start gap-2 min-w-0">
          <MessageSquareQuote className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="font-semibold text-slate-900 block text-[11px] mb-0.5">
              실제 일기 속 한줄평:
            </span>
            <p className="italic text-slate-600 line-clamp-2 break-words">
              {item.highlightQuote}
            </p>
          </div>
        </div>
      </div>

      {/* BM Affiliate Box */}
      <div className="pt-3 mt-auto min-w-0 w-full">
        <SponsoredBox sponsored={item.sponsoredInfo} itemName={item.name} />
      </div>
    </div>
  );
};
