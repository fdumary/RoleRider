import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  ClipboardPaste,
  Layers,
  Search,
  Check
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge, EvidenceBadge } from '../ui/Badge';

export interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_JOB_POSTING = `Junior Backend Engineer — Cloud & Distributed Systems
Company: Nexus Systems Technologies
Location: Hybrid / Remote

About the Role:
We are seeking a Junior Backend Software Engineer to join our Platform Core team. You will assist in architecting high-throughput REST APIs, managing database migrations, and containerizing microservices.

Responsibilities:
- Build and maintain RESTful API endpoints using Python (FastAPI or Django).
- Design and optimize relational schemas in PostgreSQL.
- Implement caching patterns with Redis to support low-latency endpoints.
- Package services in Docker containers and deploy to AWS container runtimes.
- Write unit and integration tests using pytest with >80% coverage.

Qualifications & Requirements:
- B.S. in Computer Science or equivalent practical project experience.
- Strong proficiency with Python and relational databases (SQL).
- Hands-on experience or projects using Docker and Redis.
- Familiarity with Git version control and automated CI testing.
- Bonus: Exposure to AWS services (EC2, ECS, S3, RDS).`;

export const JobDescriptionModal: React.FC<JobDescriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { evidences, projects, startProject, addToast } = useStore();
  const [jobText, setJobText] = useState(SAMPLE_JOB_POSTING);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState<{
    roleTitle: string;
    extractedKeywords: string[];
    matchedSkills: string[];
    missingSkills: string[];
    recommendedProjectId: string;
    coverageScore: number;
  } | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      // Extract skills from text
      const lower = jobText.toLowerCase();
      const detected: string[] = [];
      if (lower.includes('python')) detected.push('Python');
      if (lower.includes('fastapi') || lower.includes('django') || lower.includes('rest')) detected.push('RESTful API Architecture');
      if (lower.includes('sql') || lower.includes('postgres')) detected.push('SQL & Relational Databases');
      if (lower.includes('docker') || lower.includes('container')) detected.push('Docker & Containerization');
      if (lower.includes('redis') || lower.includes('cache') || lower.includes('caching')) detected.push('Redis & In-Memory Caching');
      if (lower.includes('aws') || lower.includes('cloud')) detected.push('AWS Cloud Services');
      if (lower.includes('test') || lower.includes('pytest')) detected.push('Automated Testing & QA');
      if (lower.includes('git')) detected.push('Git & Version Control');

      // Check user demonstrated evidence
      const demonstrated = evidences
        .filter((e) => e.status === 'project' || e.status === 'coursework')
        .map((e) => e.skillName);

      const matched = detected.filter((d) => demonstrated.includes(d));
      const missing = detected.filter((d) => !demonstrated.includes(d));
      const coverage = Math.round((matched.length / (detected.length || 1)) * 100);

      setAnalyzedResult({
        roleTitle: 'Junior Backend Engineer (Job Posting)',
        extractedKeywords: detected,
        matchedSkills: matched,
        missingSkills: missing,
        recommendedProjectId: 'project-inventory-sys',
        coverageScore: coverage,
      });

      addToast({
        type: 'success',
        title: 'Job Description Analyzed',
        message: `Extracted ${detected.length} competency requirements. ${matched.length} demonstrated, ${missing.length} missing.`,
      });
    }, 800);
  };

  const recommendedProject = projects.find((p) => p.id === analyzedResult?.recommendedProjectId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <ClipboardPaste className="w-5 h-5 text-indigo-500" />
          <span>Paste Job Description to Analyze Competency Match</span>
        </div>
      }
      description="Compare any real-world job posting against your documented resume evidence to identify specific qualification gaps."
      maxWidth="2xl"
    >
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Job Description Text or Link
            </label>
            <button
              type="button"
              onClick={() => setJobText(SAMPLE_JOB_POSTING)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Insert Sample Posting
            </button>
          </div>
          <textarea
            rows={5}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste text from LinkedIn, Indeed, Handshake, or Company Careers portal..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626] p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isAnalyzing}
            onClick={handleAnalyze}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Extract Competencies & Compare Gaps
          </Button>
        </div>

        {/* Analyzed Results */}
        {analyzedResult && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
            {/* Match Coverage Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Target Competency Coverage
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {analyzedResult.matchedSkills.length} of {analyzedResult.extractedKeywords.length} Required Competencies Demonstrated
                </h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {analyzedResult.coverageScore}%
                </span>
                <span className="text-[10px] text-slate-400 block">Evidence Match</span>
              </div>
            </div>

            {/* Split: Demonstrated vs Missing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Demonstrated */}
              <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px] block mb-2">
                  ✓ Verified in Your Background ({analyzedResult.matchedSkills.length})
                </span>
                <div className="space-y-1">
                  {analyzedResult.matchedSkills.map((sk) => (
                    <div key={sk} className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Gaps */}
              <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
                <span className="font-bold text-rose-700 dark:text-rose-400 uppercase text-[10px] block mb-2">
                  ✕ Missing Proof in Background ({analyzedResult.missingSkills.length})
                </span>
                <div className="space-y-1">
                  {analyzedResult.missingSkills.map((sk) => (
                    <div key={sk} className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Project to Close Missing Gaps */}
            {recommendedProject && (
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
                    Recommended Project to Qualify for This Posting:
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {recommendedProject.title}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Directly addresses missing requirements: {analyzedResult.missingSkills.join(', ')}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    startProject(recommendedProject.id);
                    onClose();
                  }}
                  className="shrink-0"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Start Project Roadmap
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

