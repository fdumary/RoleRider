import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Info,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  RotateCcw,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, EvidenceBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { EvidenceStatus, ResumeSkillItem } from '../../types';

export const ResumeAnalysisPage: React.FC = () => {
  const {
    resumeData,
    updateResumeSkills,
    addResumeSkill,
    removeResumeSkill,
    setSimulatedResume,
    addToast
  } = useStore();

  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming Languages');
  const [newSkillEvidence, setNewSkillEvidence] = useState<EvidenceStatus>('claimed');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const handleSimulateNewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSimulatingUpload(true);
    setTimeout(() => {
      setIsSimulatingUpload(false);
      setSimulatedResume({
        ...resumeData,
        fileName: file.name,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      addToast({
        type: 'success',
        title: 'Resume Analyzed (Demo Simulation)',
        message: `Extracted 8 technical competencies from ${file.name}.`,
      });
    }, 1200);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addResumeSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      evidenceStatus: newSkillEvidence,
      yearsExperience: 'User added',
    });

    setNewSkillName('');
    setIsAddSkillModalOpen(false);
    addToast({
      type: 'success',
      title: 'Skill Added',
      message: `Added ${newSkillName} with status: ${newSkillEvidence}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & File Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Resume Analysis & Evidence Extraction
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Provisional technical competency extraction from your uploaded resume. Review and edit any extracted claims.
          </p>
        </div>

        <div className="relative">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleSimulateNewUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button
            variant="outline"
            size="sm"
            isLoading={isSimulatingUpload}
            leftIcon={<UploadCloud className="w-4 h-4" />}
          >
            Upload New Resume
          </Button>
        </div>
      </div>

      {/* Provisional Analysis Warning / Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold block text-amber-900 dark:text-amber-200 mb-0.5">
            Provisional Simulated Analysis Notice
          </strong>
          Resume analysis is strictly provisional and does not independently verify technical proficiency or guarantee candidate qualifications. A resume keyword claim is classified as <em>Unverified</em> until backed by verified coursework or functional project artifacts.
        </div>
      </div>

      {/* File Metadata Card */}
      <Card className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {resumeData.fileName}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Size: {resumeData.fileSize} • Uploaded: {resumeData.uploadDate} • Format: PDF
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm">
            <Sparkles className="w-3 h-3 mr-1" /> Client-Side Demo Parser
          </Badge>
          <Badge variant="success" size="sm">
            Verified Source
          </Badge>
        </div>
      </Card>

      {/* SECTION 1: EXTRACTED TECHNICAL SKILLS WITH EVIDENCE CLASSIFICATION */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-500" />
              <span>Extracted Technical Competencies & Evidence Status</span>
            </CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Competencies are classified by evidence backing: Project, Coursework, Claimed, or Unverified.
            </p>
          </div>
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsAddSkillModalOpen(true)}
          >
            Add Skill
          </Button>
        </CardHeader>

        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {resumeData.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626] flex flex-col justify-between group hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {skill.category}
                    </span>
                    <button
                      onClick={() => removeResumeSkill(skill.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-0.5"
                      title="Remove skill"
                      aria-label="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                    {skill.name}
                  </h5>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <EvidenceBadge status={skill.evidenceStatus} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* SECTION 2: EDUCATION & COURSEWORK */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>Extracted Education & Relevant Academic Coursework</span>
          </CardTitle>
        </CardHeader>
        <div className="p-5 space-y-4">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {edu.degree}
                </h4>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {edu.graduationYear}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {edu.institution}
              </p>

              <div className="mt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Verified Academic Coursework
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SECTION 3: EXPERIENCE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-500" />
            <span>Work & Instructional Experience</span>
          </CardTitle>
        </CardHeader>
        <div className="p-5 space-y-4">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {exp.position}
                </h4>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {exp.organization}
              </p>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Technologies:
                </span>
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SECTION 4: PROJECTS EXTRACTED */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <span>Extracted Technical Projects</span>
          </CardTitle>
        </CardHeader>
        <div className="p-5 space-y-4">
          {resumeData.projects.map((proj) => (
            <div key={proj.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1626]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {proj.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {proj.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {proj.demonstratedCompetencies.map((comp) => (
                  <span
                    key={comp}
                    className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium"
                  >
                    ✓ Proves {comp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add Skill Modal */}
      <Modal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        title="Add or Clarify Technical Competency"
        description="Add a technical skill and specify its documented evidence backing."
      >
        <form onSubmit={handleAddSkill} className="space-y-4">
          <Input
            label="Skill Name"
            placeholder="e.g. Redis, Docker, TypeScript"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white text-sm px-3 py-2"
            >
              <option value="Programming Languages">Programming Languages</option>
              <option value="Backend Frameworks">Backend Frameworks</option>
              <option value="Databases">Databases</option>
              <option value="Cloud & Containers">Cloud & Containers</option>
              <option value="Testing & QA">Testing & QA</option>
              <option value="Tools & DevOps">Tools & DevOps</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Evidence Classification
            </label>
            <select
              value={newSkillEvidence}
              onChange={(e) => setNewSkillEvidence(e.target.value as EvidenceStatus)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white text-sm px-3 py-2"
            >
              <option value="claimed">Claimed (Listed on resume without repo proof)</option>
              <option value="coursework">Coursework Evidence (Academic class assignment)</option>
              <option value="project">Project Evidence (Public code repository)</option>
              <option value="assessment">Assessment Evidence (Standardized technical test)</option>
              <option value="unverified">Unverified Keyword (ATS scan only)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddSkillModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Competency
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

