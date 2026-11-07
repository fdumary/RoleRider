import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  sublabel?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'success' | 'warning';
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  size = 'sm',
  variant = 'primary',
  showPercentage = true,
  className,
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizes = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const barColors = {
    primary: 'bg-indigo-600 dark:bg-indigo-500',
    accent: 'bg-cyan-500 dark:bg-cyan-400',
    success: 'bg-emerald-500 dark:bg-emerald-400',
    warning: 'bg-amber-500 dark:bg-amber-400',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs mb-1.5">
          <div className="flex items-center gap-2">
            {label && <span className="font-semibold text-slate-700 dark:text-slate-200">{label}</span>}
            {sublabel && <span className="text-slate-400 dark:text-slate-500">{sublabel}</span>}
          </div>
          {showPercentage && (
            <span className="font-mono font-medium text-slate-600 dark:text-slate-400">{percentage}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full transition-all duration-500 rounded-full', barColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

