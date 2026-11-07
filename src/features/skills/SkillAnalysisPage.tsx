import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  BarChart3,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  Info,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, EvidenceBadge, RubricBadge, PriorityBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Skill, CompetencyEvidence, SkillGap } from '../../types';

export const SkillAnalysisPage: React.FC = () => {
  const {
    skills,
    evidences,
    skillGaps,
    projects,
    careers,
    user
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [evidenceFilter, setEvidenceFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const targetCareer = careers.find((c) => c.id === user.targetCareerId) || careers[0];

  // Map skill with evidence and gap info
  const enrichedSkills = skills.map((sk) => {
    const ev = evidences.find((e) => e.skillId === sk.id);
    const gap = skillGaps.find((g) => g.skillId === sk.id);
    return {
      skill: sk,
      evidence: ev,
      gap,
      currentLevel: ev ? ev.currentLevel : 'none',
      targetLevel: gap ? gap.targetLevel : 'proficient',
      priority: gap ? gap.priority : 'medium',
      evidenceStatus: ev ? ev.status : 'none',
    };
  });

  const filtered = enrichedSkills.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = item.skill.name.toLowerCase().includes(q) || item.skill.category.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || item.skill.category === categoryFilter;
    const matchesEvidence = evidenceFilter === 'all' || item.evidenceStatus === evidenceFilter;
    return matchesSearch && matchesCategory && matchesEvidence;
  });

  // Data for Category / Evidence Status Breakdown charts
  const evidenceCounts = [
    { name: 'Project Evidence', count: evidences.filter((e) => e.status === 'project').length, color: '#10B981' },
    { name: 'Coursework', count: evidences.filter((e) => e.status === 'coursework').length, color: '#4F46E5' },
    { name: 'Claimed / Unverified', count: evidences.filter((e) => e.status === 'claimed' || e.status === 'unverified').length, color: '#F59E0B' },
    { name: 'Missing Evidence', count: skillGaps.filter((g) => g.evidenceStatus === 'none').length, color: '#F43F5E' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Evidence-Based Competency Matrix
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transparent, rubric-based proficiency analysis for <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{targetCareer.title}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent">Rubric: WCAG / Industry Standard</Badge>
          <Badge variant="primary">Target: Junior Backend</Badge>
        </div>
      </div>

      {/* Visual Analytics Overview (2-col grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Evidence Status Breakdown Chart */}
        <Card className="p-5">
          <CardTitle className="text-sm mb-1">Evidence Status Distribution</CardTitle>
          <p className="text-xs text-slate-400 mb-3">
            Breakdown of verifiable proof across target competencies.
          </p>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evidenceCounts} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {evidenceCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 4-Stage Rubric Explainer Card */}
        <Card className="p-5 bg-gradient-to-br from-slate-50 to-white dark:from-[#131D31] dark:to-[#0E1626]">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-sm">Transparent 4-Stage Rubric</CardTitle>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            We avoid arbitrary 0–100% scores. Every rating is mapped to measurable behavioral criteria.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] block">
                1. Exposure
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                Knows terminology, basic syntax, and conceptual purpose.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] block">
                2. Foundational
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                Builds working features independently with standard patterns.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 uppercase text-[10px] block">
                3. Proficient
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                Handles edge cases, testing, concurrency, and performance tuning.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                4. Advanced
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                Architects distributed systems, optimizes internals and reliability.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Python, Docker, Redis)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs font-medium text-slate-700 dark:text-slate-300 px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="programming">Programming</option>
            <option value="backend">Backend APIs</option>
            <option value="databases">Databases & Cache</option>
            <option value="cloud">Cloud & DevOps</option>
            <option value="testing">Testing</option>
            <option value="security">Security</option>
          </select>

          <select
            value={evidenceFilter}
            onChange={(e) => setEvidenceFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs font-medium text-slate-700 dark:text-slate-300 px-3 py-2"
          >
            <option value="all">All Evidence Types</option>
            <option value="project">Project Evidence</option>
            <option value="coursework">Coursework</option>
            <option value="claimed">Claimed</option>
            <option value="unverified">Unverified Keyword</option>
            <option value="none">No Evidence</option>
          </select>
        </div>
      </div>

      {/* Main Competency Table (matching Section 10 table specification) */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-[#0E1626] border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Skill / Competency</th>
                <th className="py-3.5 px-4">Current Evidence</th>
                <th className="py-3.5 px-4">Current Level</th>
                <th className="py-3.5 px-4">Target Level</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filtered.map((item) => (
                <tr
                  key={item.skill.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  onClick={() => setSelectedSkill(item.skill)}
                >
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.skill.name}
                    </div>
                    <div className="text-[11px] text-slate-400 capitalize mt-0.5">
                      {item.skill.category}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <EvidenceBadge status={item.evidenceStatus} />
                  </td>
                  <td className="py-4 px-4">
                    <RubricBadge level={item.currentLevel} />
                  </td>
                  <td className="py-4 px-4">
                    <RubricBadge level={item.targetLevel} />
                  </td>
                  <td className="py-4 px-4">
                    <PriorityBadge priority={item.priority} />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSkill(item.skill);
                      }}
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Skill Detail Drawer / Modal */}
      {selectedSkill && (
        <Modal
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{selectedSkill.name}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 capitalize">
                {selectedSkill.category}
              </span>
            </div>
          }
          description="Detailed competency expectations, employer valuation, and recommended pathway."
          maxWidth="2xl"
        >
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            {/* Why Employers Value It */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-1">
                Why Hiring Managers Value This
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedSkill.employerValue}
              </p>
            </div>

            {/* Rubric Breakdown for this Skill */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Proficiency Rubric Breakdown
              </h5>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                    Exposure
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedSkill.proficiencyRubrics.exposure}
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    Foundational
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedSkill.proficiencyRubrics.foundational}
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
                    Proficient
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedSkill.proficiencyRubrics.proficient}
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                    Advanced
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedSkill.proficiencyRubrics.advanced}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Project Blueprint */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recommended Project to Build Evidence
              </h5>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] flex items-center justify-between">
                <div>
                  <h6 className="text-xs font-bold text-slate-900 dark:text-white">
                    Distributed Inventory Management System
                  </h6>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Includes hands-on milestones explicitly exercising {selectedSkill.name}.
                  </p>
                </div>
                <Link to="/projects/project-inventory-sys">
                  <Button variant="primary" size="xs">
                    Start Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

