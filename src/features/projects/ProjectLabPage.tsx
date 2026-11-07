import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  FolderGit2,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Layers,
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, EvidenceBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const ProjectLabPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, submissions, startProject, user, careers } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const targetCareer = careers.find((c) => c.id === user.targetCareerId) || careers[0];

  const filtered = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q)) ||
      p.competenciesDeveloped.some((c) => c.toLowerCase().includes(q));
    const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Primary Competency Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Project Lab — Engineering Project Recommendations
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Tackle realistic projects engineered specifically to address your missing competencies. Build proof-of-work that technical interviewers appreciate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent">Mapped to {targetCareer.title}</Badge>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by tech (e.g. Docker, Redis, Kafka, AWS)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Difficulty:</span>
          {['all', 'beginner', 'intermediate', 'advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                difficultyFilter === diff
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => {
          const submission = submissions[project.id];
          const isStarted = submission?.isStarted;
          const completedMilestones = submission?.completedMilestoneIds.length || 0;
          const totalMilestones = project.milestones.length;
          const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

          return (
            <Card
              key={project.id}
              hoverEffect
              className={`flex flex-col justify-between ${
                isStarted ? 'border-indigo-400/80 dark:border-indigo-800 ring-1 ring-indigo-500/30' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {project.difficulty}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {project.estimatedDuration}
                    </span>
                  </div>

                  {isStarted && (
                    <Badge variant="success" size="sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                      In Progress ({progressPercent}%)
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {project.shortDescription}
                </p>
              </CardHeader>

              <CardContent className="py-2 space-y-4">
                {/* Recommendation Reason Callout */}
                <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900 text-xs">
                  <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-0.5">
                    Why Recommended for You:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-snug">
                    {project.recommendationExplanation}
                  </p>
                </div>

                {/* Progress bar if started */}
                {isStarted && (
                  <div>
                    <ProgressBar
                      value={progressPercent}
                      label="Development Progress"
                      sublabel={`${completedMilestones} of ${totalMilestones} phases`}
                      variant="primary"
                      size="xs"
                    />
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] text-slate-400 px-1 py-0.5">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Competencies developed */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Competencies Developed:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.competenciesDeveloped.slice(0, 3).map((comp) => (
                      <span
                        key={comp}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      >
                        ✓ {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3 gap-2">
                <Link to={`/projects/${project.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Project Workspace
                  </Button>
                </Link>

                {!isStarted ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      startProject(project.id);
                      navigate(`/projects/${project.id}`);
                    }}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Start Project
                  </Button>
                ) : (
                  <Link to={`/projects/${project.id}`}>
                    <Button variant="primary" size="sm">
                      Continue &rarr;
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

