import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Briefcase,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  Code2,
  Clock,
  Edit2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { GithubIcon } from '../../components/shared/GithubIcon';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const PortfolioPage: React.FC = () => {
  const { projects, submissions, user, careers } = useStore();

  const targetCareer = careers.find((c) => c.id === user.targetCareerId) || careers[0];

  // Projects that have an active submission
  const startedProjects = projects.filter((p) => submissions[p.id]?.isStarted);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Proof-of-Work Showcase</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Verified Engineering Portfolio
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            A permanent evidence record separating self-reported candidate claims from verified code repositories, live APIs, and architectural reflections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success">Candidate: {user.name}</Badge>
        </div>
      </div>

      {/* Verification Legend & Transparency Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs">
          <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Artifact-Backed Evidence vs Resume Claims</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike traditional portfolios that simply list technology buzzwords, RoleRider portfolios link every competency to reproducible milestones, test suites, and git commits.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200 block mb-1">
            Prototype Disclaimer:
          </strong>
          External code analysis is simulated for demonstration. The interface is architected to integrate with future GitHub OAuth static analyzers and automated test runners.
        </div>
      </div>

      {/* Portfolio Projects Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-indigo-500" />
          <span>Active & Completed Engineering Evidence ({startedProjects.length})</span>
        </h3>

        {startedProjects.map((project) => {
          const sub = submissions[project.id];
          const completedMilestones = sub.completedMilestoneIds.length;
          const totalMilestones = project.milestones.length;
          const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

          return (
            <Card key={project.id} className="p-6 border-indigo-200/80 dark:border-indigo-900/60">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {project.difficulty}
                    </span>
                    {sub.isCompleted ? (
                      <Badge variant="success">Completed Project</Badge>
                    ) : (
                      <Badge variant="primary">In Progress ({progressPercent}%)</Badge>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Reflection Notes */}
                  {sub.reflectionNotes && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">
                        Candidate Technical Reflection:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        "{sub.reflectionNotes}"
                      </p>
                    </div>
                  )}

                  {/* Competencies Demonstrated */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Competencies Practiced:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.competenciesDeveloped.map((comp) => (
                        <span
                          key={comp}
                          className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium"
                        >
                          ✓ {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proof-of-Work Links Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 w-full lg:w-80 shrink-0 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Public Artifacts
                  </span>

                  {sub.githubUrl ? (
                    <a
                      href={sub.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <GithubIcon className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                        <span className="truncate">GitHub Repository</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                  ) : (
                    <div className="text-xs text-slate-400 italic">No repository linked yet</div>
                  )}

                  {sub.liveUrl ? (
                    <a
                      href={sub.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Globe className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span className="truncate">Live API / Demo</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                  ) : (
                    <div className="text-xs text-slate-400 italic">No deployment linked yet</div>
                  )}

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="outline" size="xs" className="w-full">
                        Edit Project Evidence in Workspace
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
