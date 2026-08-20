import React from 'react';
import { SubReviewCategory } from '../../types/review';
import { Coffee, Laptop, Car, Clapperboard, Tag } from 'lucide-react';

interface CategoryBadgeProps {
  category: SubReviewCategory;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const configs: Record<
    SubReviewCategory,
    { label: string; icon: React.ReactNode; colorClass: string }
  > = {
    place: {
      label: '장소·식당·카페',
      icon: <Coffee className="w-3.5 h-3.5" />,
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-300'
    },
    item: {
      label: '아이템·전자기기',
      icon: <Laptop className="w-3.5 h-3.5" />,
      colorClass: 'bg-sky-50 text-sky-700 border-sky-300'
    },
    transport: {
      label: '차량·이동수단',
      icon: <Car className="w-3.5 h-3.5" />,
      colorClass: 'bg-amber-50 text-amber-700 border-amber-300'
    },
    content: {
      label: '미디어·콘텐츠',
      icon: <Clapperboard className="w-3.5 h-3.5" />,
      colorClass: 'bg-purple-50 text-purple-700 border-purple-300'
    }
  };

  const current = configs[category] || configs.place;

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border border-dashed rounded-md ${
        size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } ${current.colorClass}`}
    >
      {current.icon}
      <span>{current.label}</span>
    </span>
  );
};

export const MoodBadge: React.FC<{ tag: string; size?: 'sm' | 'md' }> = ({ tag, size = 'md' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-300 rounded font-mono ${
        size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs'
      }`}
    >
      <Tag className="w-3 h-3 text-slate-400" />
      {tag.startsWith('#') ? tag : `#${tag}`}
    </span>
  );
};
