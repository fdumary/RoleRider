import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  LayoutDashboard,
  Compass,
  FileText,
  BarChart3,
  FolderGit2,
  Milestone,
  Award,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, careers } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const targetCareer = careers.find(c => c.id === user.targetCareerId) || careers[0];

  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Career Explorer', to: '/careers', icon: Compass },
    { label: 'Resume Analysis', to: '/resume', icon: FileText },
    { label: 'Skill Analysis', to: '/skills', icon: BarChart3 },
    { label: 'Project Lab', to: '/projects', icon: FolderGit2, badge: 'Core' },
    { label: 'My Roadmap', to: '/roadmap', icon: Milestone },
    { label: 'Certifications', to: '/certifications', icon: Award },
    { label: 'Portfolio', to: '/portfolio', icon: Briefcase },
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0E1626] transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800/60">
          <Link
            to="/"
            aria-label="RoleRider — Go to homepage"
            className="flex items-center gap-3 focus:outline-none group"
            onClick={onCloseMobile}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                  Role<span className="text-indigo-600 dark:text-indigo-400">Rider</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 mt-1 truncate">
                  Don't just apply, qualify!
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0 transition-colors',
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Target Career Card / Status Footer */}
        {!isCollapsed ? (
          <div className="p-3 m-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Target Role</span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {targetCareer.title}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {user.experienceLevel.replace('_', ' ')}
            </p>
            <button
              onClick={() => {
                navigate('/careers');
                onCloseMobile();
              }}
              className="mt-2.5 w-full flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex justify-center">
            <button
              onClick={() => navigate('/careers')}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title={`Target: ${targetCareer.title}`}
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

