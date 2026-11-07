import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  const [internalActive, setInternalActive] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalActive;

  const setActiveTab = (val: string) => {
    if (value === undefined) {
      setInternalActive(val);
    }
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    role="tablist"
    className={cn(
      'flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 w-fit max-w-full overflow-x-auto',
      className
    )}
  >
    {children}
  </div>
);

export const TabTrigger: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
  badge?: React.ReactNode;
}> = ({ value, children, className, badge }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabTrigger must be used inside Tabs');
  const isActive = ctx.activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => ctx.setActiveTab(value)}
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 select-none whitespace-nowrap',
        isActive
          ? 'bg-white dark:bg-[#131D31] text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-slate-700/80'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50',
        className
      )}
    >
      {children}
      {badge}
    </button>
  );
};

export const TabContent: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabContent must be used inside Tabs');
  if (ctx.activeTab !== value) return null;

  return (
    <div role="tabpanel" className={cn('mt-4 focus:outline-none animate-fadeIn', className)}>
      {children}
    </div>
  );
};

