import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Award,
  BookOpen,
  Layers,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, EvidenceBadge } from '../../components/ui/Badge';

export const CareerDetailPage: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const { careers, user, setTargetCareer, evidences, projects } = useStore();

  const career = careers.find((c) => c.id === careerId) || careers[0];
  const isTarget = career.id === user.targetCareerId;

  // Filter projects recommended for this career
  const careerProjects = projects.filter((p) => p.careerIds.includes(career.id));

  // Determine user's demonstrated vs missing skills for this career
  const demonstratedSkillNames = evidences
    .filter((e) => e.status === 'project' || e.status === 'coursework')
    .map((e) => e.skillName.toLowerCase());

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/careers')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            All Careers
          </Button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {career.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isTarget ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setTargetCareer(career.id)}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Set as Target Career
            </Button>
          ) : (
            <Badge variant="success" size="md">
              <Check className="w-3.5 h-3.5 mr-1" /> Current Active Target Role
            </Badge>
          )}
        </div>
      </div>

      {/* Hero Overview Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span>{career.category}</span>
              <span>•</span>
              <span>Demand: {career.marketDemand}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {career.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {career.overview}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shrink-0 text-left min-w-[200px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Core Stack
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {career.toolsAndTech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 2-Column Split: Competencies & Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Responsibilities & Expectations */}
        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <CardTitle className="text-base mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Typical Engineering Responsibilities</span>
            </CardTitle>
            <ul className="space-y-2.5">
              {career.typicalResponsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 sm:p-6">
            <CardTitle className="text-base mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-500" />
              <span>Education & Qualifications</span>
            </CardTitle>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {career.educationRequirements.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800">
                  {edu}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Competency Comparison Against User Evidence */}
        <div className="space-y-6">
          <Card className="p-5 sm:p-6 border-indigo-200/60 dark:border-indigo-900/40">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Competency Comparison: You vs Role</span>
              </CardTitle>
              <Badge variant="primary" size="sm">Evidence Matrix</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real-time comparison between what this role demands and what your resume/portfolio currently proves.
            </p>

            <div className="space-y-4">
              {/* Foundational */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Foundational Skills Required
                </span>
                <div className="space-y-1.5">
                  {career.foundationalSkills.map((sk) => {
                    const hasEvidence = demonstratedSkillNames.some((d) => sk.toLowerCase().includes(d) || d.includes(sk.toLowerCase().split(' ')[0]));
                    return (
                      <div
                        key={sk}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sk}</span>
                        {hasEvidence ? (
                          <Badge variant="success" size="sm">
                            <Check className="w-3 h-3" /> Demonstrated
                          </Badge>
                        ) : (
                          <Badge variant="warning" size="sm">
                            Needs Evidence
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requested */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Commonly Requested Technologies
                </span>
                <div className="space-y-1.5">
                  {career.requestedSkills.map((sk) => {
                    const hasEvidence = demonstratedSkillNames.some((d) => sk.toLowerCase().includes(d) || d.includes(sk.toLowerCase().split(' ')[0]));
                    return (
                      <div
                        key={sk}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sk}</span>
                        {hasEvidence ? (
                          <Badge variant="success" size="sm">
                            <Check className="w-3 h-3" /> Demonstrated
                          </Badge>
                        ) : (
                          <Badge variant="danger" size="sm">
                            Priority Gap
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Recommended Projects for this Career */}
          <Card className="p-5 sm:p-6">
            <CardTitle className="text-base mb-3 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-cyan-500" />
              <span>Recommended Projects Addressing Gaps</span>
            </CardTitle>
            <div className="space-y-3">
              {careerProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {proj.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {proj.technologies.slice(0, 3).join(', ')} • {proj.estimatedDuration}
                    </p>
                  </div>
                  <Link to={`/projects/${proj.id}`} className="shrink-0">
                    <Button variant="outline" size="xs">
                      View Project
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

