import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Search,
  Compass,
  ArrowRight,
  Layers,
  Check,
  CheckCircle2,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const CareerExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const { careers, user, setTargetCareer } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Software Engineering', 'Web Development', 'Cloud & Infrastructure', 'Security', 'Data & Analytics', 'AI & Data Science', 'Mobile Engineering', 'IT Operations'];

  const filtered = careers.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.toolsAndTech.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Career Explorer
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore industry-calibrated technology roles, their required engineering proficiencies, and evidence expectations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>Curated Role Taxonomy (10 Profiles)</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles or technologies (e.g., Python, Docker, Cloud)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
          </span>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Roles' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((career) => {
          const isTarget = career.id === user.targetCareerId;
          return (
            <Card
              key={career.id}
              hoverEffect
              className={`flex flex-col justify-between ${
                isTarget ? 'ring-2 ring-indigo-500/70 border-indigo-500/80 shadow-md' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">
                      {career.id.includes('backend') ? '⚙️' :
                       career.id.includes('frontend') ? '🌐' :
                       career.id.includes('fullstack') ? '🚀' :
                       career.id.includes('cloud') ? '☁️' :
                       career.id.includes('cyber') ? '🛡️' :
                       career.id.includes('data') ? '📊' :
                       career.id.includes('devops') ? '🔧' :
                       career.id.includes('ml') ? '🧠' : '💻'}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                        {career.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {career.category}
                      </span>
                    </div>
                  </div>

                  {isTarget && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 shrink-0">
                      Target Role
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                  {career.shortDescription}
                </p>
              </CardHeader>

              <CardContent className="py-2 space-y-3">
                {/* Tech Pills */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Key Technologies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {career.toolsAndTech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {career.toolsAndTech.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-400">
                        +{career.toolsAndTech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Demand & Recommended Projects */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Market Demand:</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {career.marketDemand}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-3 gap-2">
                <Link to={`/careers/${career.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Deep Dive
                  </Button>
                </Link>

                {!isTarget ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setTargetCareer(career.id)}
                  >
                    Set as Target
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" disabled className="text-emerald-500">
                    <Check className="w-4 h-4 mr-1" /> Active Target
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

