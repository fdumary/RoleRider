import React from 'react';
import { cn } from '../../utils/cn';
import { EvidenceStatus, RubricLevel, PriorityLevel } from '../../types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    accent: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/80 dark:text-slate-400 dark:border-slate-700',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 leading-tight font-medium',
    md: 'text-xs px-2.5 py-1 leading-normal font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border tracking-wide font-medium select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const EvidenceBadge: React.FC<{ status: EvidenceStatus; className?: string }> = ({
  status,
  className,
}) => {
  switch (status) {
    case 'project':
      return (
        <Badge variant="success" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Project Evidence
        </Badge>
      );
    case 'coursework':
      return (
        <Badge variant="primary" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Coursework Evidence
        </Badge>
      );
    case 'assessment':
      return (
        <Badge variant="accent" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          Assessment Evidence
        </Badge>
      );
    case 'claimed':
      return (
        <Badge variant="warning" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Claimed (Unverified)
        </Badge>
      );
    case 'unverified':
      return (
        <Badge variant="warning" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Unverified Keyword
        </Badge>
      );
    case 'none':
    default:
      return (
        <Badge variant="neutral" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          No Evidence
        </Badge>
      );
  }
};

export const RubricBadge: React.FC<{ level: RubricLevel; className?: string }> = ({
  level,
  className,
}) => {
  switch (level) {
    case 'advanced':
      return <Badge variant="primary" className={cn('uppercase font-semibold tracking-wider', className)}>Advanced</Badge>;
    case 'proficient':
      return <Badge variant="accent" className={cn('uppercase font-semibold tracking-wider', className)}>Proficient</Badge>;
    case 'foundational':
      return <Badge variant="success" className={cn('uppercase font-semibold tracking-wider', className)}>Foundational</Badge>;
    case 'exposure':
      return <Badge variant="warning" className={cn('uppercase font-semibold tracking-wider', className)}>Exposure</Badge>;
    case 'none':
    default:
      return <Badge variant="neutral" className={cn('uppercase font-semibold tracking-wider', className)}>None</Badge>;
  }
};

export const PriorityBadge: React.FC<{ priority: PriorityLevel; className?: string }> = ({
  priority,
  className,
}) => {
  switch (priority) {
    case 'high':
      return <Badge variant="danger" className={cn('font-semibold', className)}>High Priority</Badge>;
    case 'medium':
      return <Badge variant="warning" className={cn('font-semibold', className)}>Medium Priority</Badge>;
    case 'low':
      return <Badge variant="neutral" className={cn('font-semibold', className)}>Low Priority</Badge>;
  }
};

