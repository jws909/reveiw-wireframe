import React from 'react';
import { SponsoredInfo } from '../../types/review';
import { ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';

interface SponsoredBoxProps {
  sponsored: SponsoredInfo;
  itemName?: string;
  variant?: 'card' | 'banner' | 'inline';
}

export const SponsoredBox: React.FC<SponsoredBoxProps> = ({
  sponsored,
  itemName,
  variant = 'card'
}) => {
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-amber-50/60 border border-dashed border-amber-300 rounded-md text-xs">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded text-[10px] shrink-0">
            {sponsored.platform}
          </span>
          <span className="font-medium text-slate-800 truncate">
            {sponsored.title}
          </span>
          <span className="font-bold text-amber-700 shrink-0">{sponsored.price}</span>
        </div>
        <a
          href={sponsored.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            alert(`[BM 시뮬레이션] ${sponsored.platform} 제휴 링크(${sponsored.url})로 이동합니다.\n구매 시 플랫폼에 소정의 수수료가 발생합니다.`);
          }}
          className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2 shrink-0 ml-auto"
        >
          <span>최저가 보러가기</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-amber-300 bg-amber-50/50 rounded-xl p-3.5 space-y-3 transition-all hover:border-amber-400 w-full min-w-0 overflow-hidden">
      {/* BM Slot Badge Header */}
      <div className="flex items-center justify-between gap-1 pb-2 border-b border-amber-200/80">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="bg-amber-400 text-amber-950 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0">
            BM 제휴 광고
          </span>
          <span className="text-xs text-amber-900 font-medium truncate flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">{itemName ? `"${itemName}" 연계` : '리뷰 연계 제휴'}</span>
          </span>
        </div>
        <span className="text-[10px] text-amber-700 font-mono shrink-0 hidden sm:inline">
          파트너스 추천
        </span>
      </div>

      {/* Main Info Box */}
      <div className="flex items-start gap-2.5 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-dashed border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
              {sponsored.platform}
            </span>
            {sponsored.badge && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1 py-0.2 rounded">
                {sponsored.badge}
              </span>
            )}
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-1 truncate" title={sponsored.title}>
            {sponsored.title}
          </p>
          <div className="flex flex-wrap items-baseline gap-1.5 mt-0.5">
            <span className="text-sm font-bold text-slate-900 font-mono">
              {sponsored.price}
            </span>
            {sponsored.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through font-mono">
                {sponsored.originalPrice}
              </span>
            )}
            {sponsored.discountRate && (
              <span className="text-[11px] font-bold text-rose-600 font-mono">
                {sponsored.discountRate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-0.5">
        <a
          href={sponsored.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            alert(`[BM 시뮬레이션] ${sponsored.platform} 제휴 링크로 연결됩니다.\n실제 서비스에서는 리뷰어 및 플랫폼에 리워드가 정산됩니다.`);
          }}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
        >
          <span>{sponsored.ctaText || '제휴 최저가 확인'}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
        <p className="text-[10px] text-slate-400 text-center mt-1 font-mono">
          * 구매/예약 시 소정의 파트너스 수수료가 정산됩니다
        </p>
      </div>
    </div>
  );
};
