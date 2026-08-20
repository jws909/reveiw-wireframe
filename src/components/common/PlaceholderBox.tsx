import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PlaceholderBoxProps {
  label: string;
  height?: string;
  subText?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const PlaceholderBox: React.FC<PlaceholderBoxProps> = ({
  label,
  height = 'h-44',
  subText,
  icon,
  className = ''
}) => {
  return (
    <div
      className={`w-full ${height} border-2 border-dashed border-slate-300 rounded-lg bg-slate-100/70 flex flex-col items-center justify-center p-4 text-center text-slate-500 hover:bg-slate-100 transition-colors ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-slate-200/80 flex items-center justify-center mb-2 text-slate-400">
        {icon || <ImageIcon className="w-5 h-5" />}
      </div>
      <span className="font-mono text-xs font-semibold text-slate-600">
        {label}
      </span>
      {subText && (
        <span className="text-[11px] text-slate-400 mt-1 max-w-xs">
          {subText}
        </span>
      )}
    </div>
  );
};
