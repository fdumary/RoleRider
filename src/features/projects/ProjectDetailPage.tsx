import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  FolderGit2,
  ExternalLink,
  BookOpen,
  Globe,
  FileCode,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  Layers,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { GithubIcon } from '../../components/shared/GithubIcon';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Input } from '../../components/ui/Input';

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const {
    projects,
    submissions,
    toggleMilestoneTask,
    toggleMilestone,
    updateProjectSubmission,
    startProject,
    addToast
  } = useStore();

  const project = projects.find((p) => p.id === projectId || p.slug === projectId) || projects[0];
  const submission = submissions[project.id] || {
    projectId: project.id,
    githubUrl: '',
    liveUrl: '',
    docsUrl: '',
    reflectionNotes: '',
    isStarted: false,
    isCompleted: false,
    lastUpdated: '',
    completedMilestoneIds: [],
    completedTaskIds: [],
  };

  // Form states for evidence
  const [githubUrl, setGithubUrl] = useState(submission.githubUrl || '');
  const [liveUrl, setLiveUrl] = useState(submission.liveUrl || '');
  const [docsUrl, setDocsUrl] = useState(submission.docsUrl || '');
  const [reflectionNotes, setReflectionNotes] = useState(submission.reflectionNotes || '');

  // Expanded milestone accordion states (default expand active or first milestone)
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    [project.milestones[0]?.id]: true,
    [project.milestones[1]?.id]: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedMilestoneCount = submission.completedMilestoneIds.length;
  const totalMilestones = project.milestones.length;
  const progressPercent = Math.round((completedMilestoneCount / totalMilestones) * 100);

  const handleSaveEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectSubmission(project.id, {
      githubUrl,
      liveUrl,
      docsUrl,
      reflectionNotes,
      isStarted: true,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/projects')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            All Projects
          </Button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
            {project.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!submission.isStarted ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => startProject(project.id)}
              leftIcon={<FolderGit2 className="w-4 h-4" />}
            >
              Enroll in Project
            </Button>
          ) : (
            <Badge variant="success" size="md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
              Workspace Active ({progressPercent}%)
            </Badge>
          )}
        </div>
      </div>

      {/* Project Banner & Overview */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {project.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {project.estimatedDuration}
              </span>
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                {totalMilestones} Structured Phases
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.overview}
            </p>

            {/* Real World Problem */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs">
              <strong className="text-slate-900 dark:text-white block mb-0.5">
                The Real-World Engineering Problem:
              </strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {project.realWorldProblem}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Tech Stack */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shrink-0 w-full lg:w-72 space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Prerequisites
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                {project.prerequisites.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-500">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Overall Project Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <ProgressBar
            value={progressPercent}
            label="Milestone Completion Progress"
            sublabel={`${completedMilestoneCount} of ${totalMilestones} phases marked completed`}
            variant="primary"
            size="md"
          />
        </div>
      </Card>

      {/* Main Workspace Layout (Milestones & Roadmap + Evidence Submission) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Interactive Vertical Milestone Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <span>Project Development Roadmap ({totalMilestones} Phases)</span>
            </h3>
            <span className="text-xs text-slate-400">
              Check tasks as you build to verify progress
            </span>
          </div>

          {/* Milestone Accordions */}
          <div className="space-y-4">
            {project.milestones.map((milestone) => {
              const isMilestoneDone = submission.completedMilestoneIds.includes(milestone.id);
              const isExpanded = !!expandedMilestones[milestone.id];
              const completedTasksCount = milestone.implementationTasks.filter((t) =>
                submission.completedTaskIds.includes(t.id)
              ).length;
              const totalTasksCount = milestone.implementationTasks.length;

              return (
                <div
                  key={milestone.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isMilestoneDone
                      ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31]'
                    }`}
                >
                  {/* Milestone Header */}
                  <div
                    onClick={() => toggleExpand(milestone.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMilestone(project.id, milestone.id);
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isMilestoneDone
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-indigo-500'
                          }`}
                        title={isMilestoneDone ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`text-sm sm:text-base font-bold ${isMilestoneDone ? 'text-slate-700 dark:text-slate-200 line-through' : 'text-slate-900 dark:text-white'
                            }`}>
                            {milestone.title}
                          </h4>
                          {isMilestoneDone && (
                            <Badge variant="success" size="sm">
                              Phase Completed
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {milestone.objective}
                        </p>

                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                          <span>
                            Tasks: {completedTasksCount}/{totalTasksCount} done
                          </span>
                          <span>•</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                            {milestone.skillsDeveloped.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Milestone Workspace */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-4 mt-2">
                      {/* Objective */}
                      <div className="pt-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Milestone Objective
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {milestone.objective}
                        </p>
                      </div>

                      {/* Implementation Task Checklist */}
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Implementation Task Checklist ({completedTasksCount}/{totalTasksCount})
                        </span>
                        <div className="space-y-2">
                          {milestone.implementationTasks.map((task) => {
                            const isTaskDone = submission.completedTaskIds.includes(task.id);
                            return (
                              <div
                                key={task.id}
                                onClick={() => toggleMilestoneTask(project.id, milestone.id, task.id)}
                                className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-all ${isTaskDone
                                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-600 dark:text-slate-400'
                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626] text-slate-800 dark:text-slate-200 hover:border-slate-300'
                                  }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${isTaskDone
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                                    }`}
                                >
                                  {isTaskDone && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className={isTaskDone ? 'line-through opacity-80' : ''}>
                                  {task.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Acceptance Criteria & Deliverables */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs">
                          <strong className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">
                            Acceptance Criteria:
                          </strong>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {milestone.completionCriteria}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs">
                          <strong className="text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                            Expected Deliverables:
                          </strong>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {milestone.deliverables}
                          </p>
                        </div>
                      </div>

                      {/* Learning Resources */}
                      {milestone.learningResources.length > 0 && (
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            Milestone Vetted Learning Resources
                          </span>
                          <div className="space-y-1.5">
                            {milestone.learningResources.map((res) => (
                              <a
                                key={res.id}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1626] hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {res.title}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    ({res.provider})
                                  </span>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0 ml-2" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Evidence Submission & Reflection */}
        <div className="space-y-6">
          <Card className="p-5 sm:p-6 border-indigo-200/80 dark:border-indigo-900/60 shadow-md">
            <CardTitle className="text-base mb-1 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-500" />
              <span>Project Evidence Submission</span>
            </CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Record your public GitHub repository and live deployment links to build verifiable proof for recruiters.
            </p>

            <form onSubmit={handleSaveEvidence} className="space-y-4">
              <Input
                label="GitHub Repository URL"
                placeholder="https://github.com/username/project-repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                leftIcon={<GithubIcon className="w-4 h-4" />}
              />

              <Input
                label="Live Deployment URL"
                placeholder="https://my-service.up.railway.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                leftIcon={<Globe className="w-4 h-4" />}
              />

              <Input
                label="Documentation / Swagger Link"
                placeholder="https://my-service.up.railway.app/docs"
                value={docsUrl}
                onChange={(e) => setDocsUrl(e.target.value)}
                leftIcon={<FileCode className="w-4 h-4" />}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Technical Reflection & Architectural Notes
                </label>
                <textarea
                  rows={4}
                  value={reflectionNotes}
                  onChange={(e) => setReflectionNotes(e.target.value)}
                  placeholder="Describe your design decisions, how you handled locking/caching, and what trade-offs you evaluated..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white placeholder-slate-400 text-xs p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>Proof-of-Work Disclaimer:</strong> In this prototype, repository URLs and reflection notes are stored locally in your session. We do not claim automated code verification has occurred.
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full">
                Save Project Evidence & Reflection
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
