import React from 'react';
import { TrendingUp, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeedSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const FeedSidebar: React.FC<FeedSidebarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <aside className="space-y-6">
      {/* User Daily Score Stats Widget (Wireframe) */}
      <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <Link
            to="/my"
            className="font-bold text-xs text-slate-800 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>내 하루 평점 통계</span>
            <span className="text-[10px] text-slate-400 group-hover:text-blue-500">→</span>
          </Link>
          <span className="text-[10px] font-mono text-slate-400">최근 7일</span>
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <p className="text-[11px] text-slate-500">이번 주 평균 하루 점수</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold font-mono text-slate-900">4.6</span>
              <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              +0.3점 상승 ↗
            </span>
            <p className="text-[10px] text-slate-400 mt-1">서브 리뷰 14개 등록</p>
          </div>
        </div>

        {/* Mini 7-day bar skeleton */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] text-slate-400 font-mono flex justify-between">
            <span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span>
          </div>
          <div className="flex items-end justify-between h-14 bg-slate-50 p-1.5 rounded border border-slate-200 gap-1">
            {[70, 85, 95, 80, 90, 100, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-200 hover:bg-amber-400 rounded-t transition-colors relative group" style={{ height: `${h}%` }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 py-0.5 rounded pointer-events-none font-mono">
                  {(h / 20).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Widget */}
      <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-4 space-y-3">
        <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-200">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          서브 리뷰 카테고리 필터
        </h4>

        <div className="space-y-1.5">
          {[
            { id: 'all', label: '전체 리뷰 보기', count: 6 },
            { id: 'place', label: '☕ 장소 · 식당 · 카페', count: 3 },
            { id: 'item', label: '💻 아이템 · 기기', count: 2 },
            { id: 'transport', label: '🚗 이동수단 · 모빌리티', count: 1 },
            { id: 'content', label: '🎬 콘텐츠 · 미디어', count: 1 }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                selectedCategory === cat.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* BM Affiliate Banner Wireframe */}
      <div className="border-2 border-dashed border-amber-300 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>BM 제휴 기획전 배너</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          유저들이 평점 4.5 이상 남긴 <strong>'이번 주 핫템'</strong> 최저가 모음전
        </p>
        <div className="p-3 bg-white/90 rounded-lg border border-dashed border-amber-200 space-y-1.5">
          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 py-0.5 rounded">
            특가 프로모션
          </span>
          <p className="text-xs font-bold text-slate-800">
            소니 WH-1000XM5 외 4종
          </p>
          <p className="text-xs text-slate-500 font-mono">
            최대 25% 할인 + 제휴 추가 적립
          </p>
        </div>
        <Link
          to="/explore"
          className="block w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-center rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          인기 큐레이션 보러가기 →
        </Link>
      </div>
    </aside>
  );
};
