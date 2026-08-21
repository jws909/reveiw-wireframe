import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { 
  CalendarDays, 
  Compass, 
  PlusCircle, 
  Info, 
  Layers, 
  Star,
  Sparkles,
  LogOut,
  Flame
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b-2 border-dashed border-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo & Concept Tag */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm group-hover:bg-blue-600 transition-colors">
              RE
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900">
                  RE:DAY
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-blue-200">
                  WIREFRAME
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                하루 & 라이프 리뷰 플랫폼 (1:N 서브리뷰 & BM)
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
                }`
              }
            >
              <CalendarDays className="w-4 h-4" />
              <span className="hidden xs:inline">피드</span>
            </NavLink>

            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
                }`
              }
            >
              <Compass className="w-4 h-4" />
              <span className="hidden xs:inline">탐색 & 트렌드</span>
            </NavLink>

            <NavLink
              to="/write"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                }`
              }
            >
              <PlusCircle className="w-4 h-4" />
              <span>하루 쓰기</span>
            </NavLink>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-1.5 pl-1 sm:pl-2 border-l border-slate-200">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-md bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-[11px]">
                    {user.avatar}
                  </div>
                  <div className="hidden md:flex items-center gap-1 text-[11px]">
                    <span className="font-bold text-slate-800 truncate max-w-[80px]">
                      {user.name}
                    </span>
                    <span className="text-orange-600 font-mono flex items-center font-bold">
                      <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                      {user.streakDays}일
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="로그아웃"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
                <Link
                  to="/login"
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-2.5 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors hidden sm:inline"
                >
                  회원가입
                </Link>
              </div>
            )}

            <button
              onClick={() => setShowInfoModal(true)}
              title="와이어프레임 가이드"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Wireframe Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border-2 border-dashed border-slate-400 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  RE:DAY 기획 & 와이어프레임 안내
                </h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-mono px-2 py-1 bg-slate-100 rounded"
              >
                닫기 ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  1. 메인 데일리 리뷰 (1)
                </p>
                <p>일기장처럼 오늘 하루 전체의 삶을 기록하고 종합 평점(1~5점) 및 기분 태그를 기록합니다.</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  2. 서브 리뷰 시스템 (1 : N)
                </p>
                <p>하루 리뷰 안에 종속되는 세부 리뷰(방문한 식당/카페, 사용한 전자기기, 탑승한 차량, 소비한 콘텐츠 등)를 무제한으로 추가할 수 있습니다.</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-bold text-amber-900 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  3. 비즈니스 모델 (BM) 제휴 연동
                </p>
                <p className="text-amber-800">서브 리뷰 항목과 자연스럽게 연계되는 제품/장소 제휴 광고 및 최저가 추천 링크를 노출하여 수익 모델을 실현합니다.</p>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-lg font-medium text-xs hover:bg-slate-800"
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}
    </>
  );
};
