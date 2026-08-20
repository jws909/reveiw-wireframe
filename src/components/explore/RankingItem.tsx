import React, { useState } from 'react';
import { Flame, Heart } from 'lucide-react';

interface StreakChallengerProps {
  author: {
    name: string;
    level: string;
    avatar: string;
    badge?: string;
  };
  streakDays: number;
  totalDailyReviews: number;
  totalSubReviews: number;
  recentMood?: string;
  cheerCount?: number;
}

export const StreakChallengerCard: React.FC<StreakChallengerProps> = ({
  author,
  streakDays,
  totalDailyReviews,
  totalSubReviews,
  recentMood,
  cheerCount = 0
}) => {
  const [likes, setLikes] = useState(cheerCount);
  const [isCheered, setIsCheered] = useState(false);

  const handleCheer = () => {
    setIsCheered(!isCheered);
    setLikes(prev => isCheered ? prev - 1 : prev + 1);
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-white border-2 border-dashed border-slate-200 rounded-xl hover:border-slate-400 transition-colors">
      <div className="flex items-center gap-3">
        {/* Streak Flame Badge */}
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-orange-50 border border-dashed border-orange-300 text-orange-600 shrink-0">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span className="text-xs font-bold font-mono">{streakDays}일</span>
        </div>

        {/* User Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-sm text-slate-900 truncate">{author.name}</span>
            {author.badge && (
              <span className="text-[10px] font-semibold text-orange-800 bg-orange-100 px-1.5 py-0.2 rounded border border-orange-200 shrink-0">
                {author.badge}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <span className="font-mono text-[11px] text-slate-400">{author.level}</span>
            <span>•</span>
            <span className="text-[11px] text-slate-600 font-mono">
              기록 {totalDailyReviews}편 (서브 {totalSubReviews}개)
            </span>
          </div>
          {recentMood && (
            <div className="mt-1">
              <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-mono">
                최근 태그 {recentMood}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Cheer Button */}
      <div className="text-right shrink-0">
        <button
          type="button"
          onClick={handleCheer}
          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
            isCheered
              ? 'bg-rose-50 border-rose-300 text-rose-600 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isCheered ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>응원 {likes}</span>
        </button>
      </div>
    </div>
  );
};

export const RankingItem = StreakChallengerCard;
