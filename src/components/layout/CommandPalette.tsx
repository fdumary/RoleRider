import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Search, Compass, FolderGit2, BarChart3, FileText, ArrowRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export const CommandPalette: React.FC = () => {
  const { isSearchOpen, setSearchOpen, careers, projects, skills } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCareers = careers.filter(
    (c) => c.title.toLowerCase().includes(q) || c.toolsAndTech.some((t) => t.toLowerCase().includes(q))
  ).slice(0, 3);

  const filteredProjects = projects.filter(
    (p) => p.title.toLowerCase().includes(q) || p.technologies.some((t) => t.toLowerCase().includes(q))
  ).slice(0, 3);

  const filteredSkills = skills.filter(
    (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  ).slice(0, 3);

  const staticPages = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: FileText },
    { name: 'Resume Analysis', path: '/resume', icon: FileText },
    { name: 'Evidence-Based Skill Analysis', path: '/skills', icon: BarChart3 },
    { name: 'Project Lab', path: '/projects', icon: FolderGit2 },
    { name: 'Career Roadmap', path: '/roadmap', icon: Compass },
    { name: 'Industry Certifications', path: '/certifications', icon: Compass },
  ].filter((p) => p.name.toLowerCase().includes(q));

  const handleSelect = (path: string) => {
    setSearchOpen(false);
    setQuery('');
    navigate(path);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setSearchOpen(false)}
      />

      {/* Palette box */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Search Input bar */}
        <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, projects, skills, or pages..."
            className="w-full px-3 py-4 text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recommended Projects
              </div>
              {filteredProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(`/projects/${proj.id}`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {proj.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {proj.technologies.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Careers */}
          {filteredCareers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Technology Careers
              </div>
              {filteredCareers.map((career) => (
                <button
                  key={career.id}
                  onClick={() => handleSelect(`/careers/${career.id}`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Compass className="w-4 h-4 text-cyan-500 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {career.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {career.category}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Skills */}
          {filteredSkills.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Skills & Competencies
              </div>
              {filteredSkills.map((sk) => (
                <button
                  key={sk.id}
                  onClick={() => handleSelect('/skills')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BarChart3 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {sk.name}
                      </p>
                      <p className="text-[11px] text-slate-400 capitalize truncate">
                        {sk.category}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Pages */}
          {staticPages.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Navigation Pages
              </div>
              {staticPages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => handleSelect(page.path)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <page.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {page.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && filteredCareers.length === 0 && filteredSkills.length === 0 && staticPages.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrow keys or click</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

