import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Sparkles,
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Compass,
  FileText,
  RotateCcw,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, EvidenceBadge, PriorityBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    careers,
    evidences,
    skillGaps,
    projects,
    submissions,
    activities,
    setTargetCareer
  } = useStore();

  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);

  const targetCareer = careers.find((c) => c.id === user.targetCareerId) || careers[0];

  // Active Project (first started or default inventory sys)
  const activeSubmission = Object.values(submissions).find((s) => s.isStarted && !s.isCompleted) || submissions['project-inventory-sys'];
  const activeProject = projects.find((p) => p.id === activeSubmission?.projectId) || projects[0];

  // Calculate active project progress
  const completedMilestoneCount = activeSubmission?.completedMilestoneIds.length || 0;
  const totalMilestones = activeProject.milestones.length;
  const projectProgressPercent = Math.round((completedMilestoneCount / totalMilestones) * 100);

  // Active milestone
  const activeMilestone = activeProject.milestones.find(
    (m) => !activeSubmission?.completedMilestoneIds.includes(m.id)
  ) || activeProject.milestones[0];

  // Competency counts
  const demonstratedCount = evidences.filter((e) => e.status === 'project' || e.status === 'coursework' || e.status === 'assessment').length;
  const developingCount = evidences.filter((e) => e.currentLevel === 'exposure' || e.status === 'claimed').length;
  const needingEvidenceCount = skillGaps.length;

  // Chart data for Radar / Competency Distribution
  const radarData = [
    { subject: 'Programming', userScore: 85, benchmark: 90 },
    { subject: 'Backend APIs', userScore: 65, benchmark: 85 },
    { subject: 'Databases', userScore: 70, benchmark: 80 },
    { subject: 'Cloud & Containers', userScore: 25, benchmark: 75 },
    { subject: 'Automated Testing', userScore: 40, benchmark: 70 },
    { subject: 'Security & Auth', userScore: 35, benchmark: 65 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-indigo-950/30 to-slate-900/40 border border-indigo-500/20 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Target Role Pathway Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, {user.name.split(' ')[0]}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            You're actively building competencies to qualify as a{' '}
            <strong className="text-indigo-300 font-semibold">{targetCareer.title}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCareerModalOpen(true)}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            Change Target Role
          </Button>
          <Link to={`/projects/${activeProject.id}`}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Continue Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Demonstrated Skills
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {demonstratedCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              with project/academic proof
            </span>
          </div>
          <div className="mt-3 flex gap-1.5 flex-wrap">
            {evidences
              .filter((e) => e.status === 'project' || e.status === 'coursework')
              .slice(0, 3)
              .map((e) => (
                <span
                  key={e.id}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  {e.skillName}
                </span>
              ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Developing Skills
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {developingCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              claimed or initial exposure
            </span>
          </div>
          <div className="mt-3 flex gap-1.5 flex-wrap">
            {evidences
              .filter((e) => e.status === 'claimed' || e.currentLevel === 'exposure')
              .map((e) => (
                <span
                  key={e.id}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                >
                  {e.skillName}
                </span>
              ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Priority Gaps to Build
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {needingEvidenceCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              skills missing proof
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Targeting Docker, Redis, and cloud containerization via active project.
          </p>
        </Card>
      </div>

      {/* Main Grid: Active Project & Contextual Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Active Project & Priority Gaps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Project Workspace Widget */}
          <Card className="p-5 sm:p-6 border-indigo-200/80 dark:border-indigo-900/60 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Enrolled Engineering Project</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {activeProject.shortDescription}
                </p>
              </div>

              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                {activeProject.estimatedDuration}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <ProgressBar
                value={projectProgressPercent}
                label="Overall Project Completion"
                sublabel={`${completedMilestoneCount} of ${totalMilestones} phases completed`}
                variant="primary"
                size="md"
              />
            </div>

            {/* Current Active Milestone Callout */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Current Milestone in Progress
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeMilestone.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {activeMilestone.objective}
                </p>
              </div>

              <Link to={`/projects/${activeProject.id}`} className="shrink-0">
                <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                  Open Workspace
                </Button>
              </Link>
            </div>
          </Card>

          {/* Priority Skill Gaps */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Priority Skill Gaps for {targetCareer.title}</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Missing or unverified competencies required by tech employers
                </p>
              </div>
              <Link to="/skills">
                <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Full Matrix
                </Button>
              </Link>
            </CardHeader>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {skillGaps.slice(0, 4).map((gap) => (
                <div
                  key={gap.skillId}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {gap.skillName}
                      </h4>
                      <PriorityBadge priority={gap.priority} />
                      <EvidenceBadge status={gap.evidenceStatus} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                      {gap.gapReason}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <Link to={`/projects/${gap.recommendedProjectIds[0] || activeProject.id}`}>
                      <Button variant="outline" size="xs">
                        Build via Project
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Contextual Action, Distribution Chart & Recent Activity */}
        <div className="space-y-6">
          {/* Recommended Next Action */}
          <Card className="p-5 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-[#131D31] border-indigo-200 dark:border-indigo-900">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Recommended Next Step</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Implement Concurrency Row Locks
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Complete task 2.3 in your Inventory System: write the <code>SELECT ... FOR UPDATE</code> query to eliminate overselling race conditions.
            </p>
            <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                Addresses SQL & API gaps
              </span>
              <Link to={`/projects/${activeProject.id}`}>
                <Button variant="primary" size="xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
                  Go to Task
                </Button>
              </Link>
            </div>
          </Card>

          {/* Skill Distribution Radar Chart */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-sm">Competency Benchmark Radar</CardTitle>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                You vs Role Target
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              Visualizes demonstrated proficiency relative to junior backend expectations.
            </p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Radar
                    name="Your Evidence"
                    dataKey="userScore"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Target Benchmark"
                    dataKey="benchmark"
                    stroke="#06B6D4"
                    fill="#06B6D4"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Your Evidence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Target Role Benchmark</span>
              </div>
            </div>
          </Card>

          {/* Career Development Activity Feed */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm">Recent Activity & Milestones</CardTitle>
              <span className="text-[11px] text-slate-400 font-mono">Live Sync</span>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {act.description}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Target Career Switch Modal */}
      <Modal
        isOpen={isCareerModalOpen}
        onClose={() => setIsCareerModalOpen(false)}
        title="Select Target Technology Career"
        description="Switching target career recalculates required competencies, priority gaps, and recommended projects."
        maxWidth="lg"
      >
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {careers.map((career) => {
            const isSelected = career.id === user.targetCareerId;
            return (
              <div
                key={career.id}
                onClick={() => {
                  setTargetCareer(career.id);
                  setIsCareerModalOpen(false);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {career.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {career.category} • Demand: {career.marketDemand}
                  </p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

