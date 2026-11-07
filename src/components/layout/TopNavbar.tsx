import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Check,
  UserCheck
} from 'lucide-react';
import { Button } from '../ui/Button';

interface TopNavbarProps {
  onOpenMobile: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenMobile }) => {
  const {
    user,
    careers,
    theme,
    toggleTheme,
    setSearchOpen,
    activities,
    setTargetCareer,
    resetDemoData,
    session,
    checkSessionExpiration
  } = useStore();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const currentCareer = careers.find(c => c.id === user.targetCareerId) || careers[0];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Platform Overview';
    if (path.startsWith('/careers/')) return 'Career Deep Dive';
    if (path.startsWith('/careers')) return 'Career Explorer';
    if (path.startsWith('/resume')) return 'Resume Analysis & Evidence';
    if (path.startsWith('/skills')) return 'Evidence-Based Skill Analysis';
    if (path.startsWith('/projects/')) return 'Project Workspace';
    if (path.startsWith('/projects')) return 'Project Lab';
    if (path.startsWith('/roadmap')) return 'Personalized Career Roadmap';
    if (path.startsWith('/certifications')) return 'Industry Certifications';
    if (path.startsWith('/portfolio')) return 'Verified Portfolio';
    if (path.startsWith('/settings')) return 'Account & Learning Settings';
    return 'RoleRider';
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0E1626]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {getPageTitle()}
          </h1>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <span>RoleRider</span>
            <span>/</span>
            <span className="capitalize">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      {/* Middle & Right: Role selector, Search, Theme, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher (matching user uploaded image style) */}
        <div className="relative" ref={roleDropdownRef}>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-[#131D31] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors shadow-sm"
            aria-label="Target career role selector"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="max-w-[110px] sm:max-w-[160px] truncate">
              {currentCareer.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Switch Target Role
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {careers.map((career) => {
                  const isSelected = career.id === user.targetCareerId;
                  return (
                    <button
                      key={career.id}
                      onClick={() => {
                        setTargetCareer(career.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">
                          {career.id.includes('backend') ? '⚙️' :
                           career.id.includes('frontend') ? '🌐' :
                           career.id.includes('fullstack') ? '🚀' :
                           career.id.includes('cloud') ? '☁️' :
                           career.id.includes('cyber') ? '🛡️' :
                           career.id.includes('data') ? '📊' :
                           career.id.includes('devops') ? '🔧' :
                           career.id.includes('ml') ? '🧠' : '💻'}
                        </span>
                        <span className="truncate">{career.title}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="ghost"
                  size="xs"
                  className="w-full text-indigo-600 dark:text-indigo-400"
                  onClick={() => {
                    navigate('/careers');
                    setIsRoleDropdownOpen(false);
                  }}
                >
                  View All Careers in Explorer
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Global Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-[#131D31] text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title="Search skills, projects, and careers (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick Jump...</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Activity feed and notifications"
          >
            <Bell className="w-4 h-4" />
            {activities.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 ring-2 ring-white dark:ring-[#0E1626]" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 shadow-xl py-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Activity & Progress
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activities.length} recent
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto px-2 py-1 divide-y divide-slate-100 dark:divide-slate-800/60">
                {activities.slice(0, 6).map((act) => (
                  <div
                    key={act.id}
                    onClick={() => {
                      if (act.link) navigate(act.link);
                      setIsNotificationsOpen(false);
                    }}
                    className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                        {act.type === 'milestone_completed' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> :
                         act.type === 'project_started' ? <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" /> :
                         <Sparkles className="w-3.5 h-3.5 text-cyan-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {act.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                          {act.description}
                        </p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1 block">
                          {act.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              checkSessionExpiration();
              setIsUserMenuOpen(!isUserMenuOpen);
            }}
            className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            aria-label="User profile menu"
          >
            {session.isGuest ? (
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 hidden md:inline-block">
                Guest
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hidden md:inline-block">
                {user.name.split(' ')[0]}
              </span>
            )}
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/30"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  {session.isGuest && (
                    <span className="text-[9px] font-mono uppercase bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold">
                      Guest
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {user.email}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold">
                  <UserCheck className="w-3 h-3" />
                  <span>{currentCareer.title}</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  Account & Preferences
                </button>
                <button
                  onClick={() => {
                    navigate('/onboarding');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  Run Onboarding Again
                </button>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  Start New Guest Session
                </button>
                <button
                  onClick={() => {
                    navigate('/');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  View Landing Page
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all prototype state to original demo data?')) {
                      resetDemoData();
                      setIsUserMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Fixture Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

