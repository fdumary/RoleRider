import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Milestone,
  CheckCircle2,
  Lock,
  ArrowRight,
  FolderGit2,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const RoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    roadmapStages,
    projects,
    submissions,
    user,
    careers
  } = useStore();

  const targetCareer = careers.find((c) => c.id === user.targetCareerId) || careers[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Milestone className="w-4 h-4" />
            <span>Structured Career Trajectory</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personalized Roadmap for {targetCareer.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            A sequential four-stage pathway taking you from core computing foundations to production engineering competence and verifiable portfolio readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent">Stage 2 & 3 Active</Badge>
        </div>
      </div>

      {/* Trajectory Stages Overview */}
      <div className="space-y-6">
        {roadmapStages.map((stage) => {
          const isCompleted = stage.status === 'completed';
          const isInProgress = stage.status === 'in_progress';
          const isLocked = stage.status === 'locked';

          // Get projects mapped to this stage
          const stageProjects = projects.filter((p) => stage.projectIds.includes(p.id));

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCompleted
                  ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/15 dark:bg-emerald-950/20'
                  : isInProgress
                  ? 'border-indigo-400 dark:border-indigo-800 bg-white dark:bg-[#131D31] ring-1 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626] opacity-75'
              }`}
            >
              {/* Stage Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isInProgress
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : isLocked ? <Lock className="w-5 h-5" /> : stage.stageNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {stage.title}
                      </h3>
                      {isCompleted && <Badge variant="success" size="sm">Stage Completed</Badge>}
                      {isInProgress && <Badge variant="primary" size="sm">Active Stage</Badge>}
                      {isLocked && <Badge variant="neutral" size="sm">Locked Prerequisites</Badge>}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Status
                  </span>
                  <span className={`text-xs font-semibold capitalize ${
                    isCompleted ? 'text-emerald-500' : isInProgress ? 'text-indigo-500' : 'text-slate-400'
                  }`}>
                    {stage.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Stage Body */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Skills to Develop */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Competencies Developed in This Stage:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stage.skillsToDevelop.map((sk) => (
                      <span
                        key={sk}
                        className={`text-xs px-3 py-1 rounded-lg border font-medium ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : 'bg-white dark:bg-[#0E1626] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {isCompleted && '✓ '}
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Projects for this stage */}
                {stageProjects.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Practical Engineering Projects for This Stage:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stageProjects.map((p) => {
                        const sub = submissions[p.id];
                        const isProjStarted = sub?.isStarted;
                        const completedMils = sub?.completedMilestoneIds.length || 0;
                        const totalMils = p.milestones.length;
                        const pct = Math.round((completedMils / totalMils) * 100);

                        return (
                          <div
                            key={p.id}
                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1626] flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-mono text-slate-400">{p.estimatedDuration}</span>
                                {isProjStarted ? (
                                  <span className="text-emerald-500 font-semibold">{pct}% Complete</span>
                                ) : (
                                  <span className="text-slate-400">Not Started</span>
                                )}
                              </div>
                              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                                {p.title}
                              </h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {p.shortDescription}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                              <Link to={`/projects/${p.id}`}>
                                <Button variant="outline" size="xs" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                                  {isProjStarted ? 'Continue Project' : 'Start Project'}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Completion Requirements */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Stage Graduation Criteria:
                  </span>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {stage.completionRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

