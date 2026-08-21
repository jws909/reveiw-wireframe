import React from 'react';
import { Layers, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-dashed border-slate-300 bg-slate-100/80 py-10 mt-16 text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-dashed border-slate-300">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded text-xs">
                RE:DAY
              </span>
              <span className="text-xs font-semibold text-slate-700">하루 & 라이프 리뷰</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              기록이 곧 라이프스타일이 되는 곳. 하루 종합 평점부터 방문한 장소, 사용한 아이템까지 입체적으로 기록하고 공유하는 플랫폼 와이어프레임입니다.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              핵심 아키텍처 (1:N 서브리뷰)
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• 메인 데일리 리뷰 (날짜, 종합 평점, 총평, 기분 태그)</li>
              <li>• 세부 서브 리뷰 (장소, 아이템, 이동수단, 미디어)</li>
              <li>• 내돈내산 영수증 인증 마크 시스템</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              비즈니스 모델 (BM) 구조
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• 서브 리뷰 아이템 키워드 기반 제휴 최저가 자동 매칭</li>
              <li>• 쿠팡 / 네이버쇼핑 / 캐치테이블 / 모빌리티 제휴 API 연동</li>
              <li>• 리뷰어-플랫폼 제휴 수익 공유 (Revenue Share)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>RE:DAY Wireframe Prototype v1.0.0 (Vite + React + Tailwind CSS)</span>
          </div>
          <div className="font-mono text-[11px]">
            Designed with dashed-border wireframe style for GitHub Pages
          </div>
        </div>
      </div>
    </footer>
  );
};
