import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0 to 5, can be decimal
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showScoreText?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showScoreText = false
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-lg font-bold'
  };

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isFull = rating >= starValue;
          const isHalf = !isFull && rating >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`${
                interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
              } focus:outline-none`}
            >
              <Star
                className={`${iconSizes[size]} ${
                  isFull
                    ? 'fill-amber-400 text-amber-500'
                    : isHalf
                    ? 'fill-amber-200 text-amber-500'
                    : 'text-slate-300 stroke-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showScoreText && (
        <span className={`text-slate-700 ml-1 font-mono ${textSizes[size]}`}>
          {rating.toFixed(1)} <span className="text-slate-400 font-normal">/ {maxRating}.0</span>
        </span>
      )}
    </div>
  );
};
