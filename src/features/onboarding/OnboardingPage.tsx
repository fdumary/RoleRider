import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  FileText,
  Clock,
  Layers,
  Code2,
  AlertCircle,
  Search,
  Check,
  Info,
  ShieldCheck,
  FolderGit2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge, EvidenceBadge, PriorityBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    careers,
    completeOnboarding,
    addToast,
    resumeData,
    setSimulatedResume,
    skillGaps,
    evidences,
    projects,
    startProject,
    session
  } = useStore();

  // 3-step streamlined workflow: Target Career -> Upload Resume -> Analyze & Generate Pathway
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Selected Career
  const [selectedCareerId, setSelectedCareerId] = useState(user.targetCareerId || 'backend-engineer');
  const [careerSearch, setCareerSearch] = useState('');

  // Resume Upload State
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>({
    name: resumeData.fileName,
    size: resumeData.fileSize,
    type: 'application/pdf',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const filteredCareers = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(careerSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(careerSearch.toLowerCase()) ||
      c.toolsAndTech.some((t) => t.toLowerCase().includes(careerSearch.toLowerCase()))
  );

  const selectedCareer = careers.find((c) => c.id === selectedCareerId) || careers[0];
  const recommendedProject = projects.find((p) => p.careerIds.includes(selectedCareer.id)) || projects[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Validate file type
    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      setUploadError('Invalid file format. Please upload a PDF or DOCX resume.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File is too large. Maximum supported resume size is 10 MB.');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setUploadedFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type || 'application/pdf',
      });
      setIsUploading(false);
      setSimulatedResume({
        ...resumeData,
        fileName: file.name,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      addToast({
        type: 'success',
        title: 'Resume Analyzed (Demo Simulation)',
        message: `Extracted competencies from ${file.name}. Clearly labeled as simulated prototype data.`,
      });
    }, 900);
  };

  const handleFinishOnboarding = () => {
    completeOnboarding({
      targetCareerId: selectedCareerId,
      onboardingCompleted: true,
    });
    addToast({
      type: 'success',
      title: 'Pathway Generated!',
      message: `Your career dashboard for ${selectedCareer.title} is now active.`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1626] px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link to="/" aria-label="RoleRider — Go to homepage" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Role<span className="text-indigo-600 dark:text-indigo-400">Rider</span>
            </span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 text-sm hidden sm:inline">|</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Streamlined Candidate Onboarding
          </span>
          {session.isGuest && (
            <Badge variant="accent" size="sm" className="hidden sm:inline-flex ml-2">
              Guest Session Active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
            Step {currentStep} of {totalSteps}
          </span>
          <Button variant="ghost" size="xs" onClick={() => navigate('/dashboard')}>
            Skip to Dashboard
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1">
        <div
          className="bg-indigo-600 h-1 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-between">
        <div>
          {/* STEP 1: SELECT TARGET CAREER */}
          {currentStep === 1 && (
            <div className="animate-fadeIn space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step 1 of 3: Primary Career Objective
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                  Select your target technology role
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Choose exactly one target career. RoleRider will benchmark your current skills against industry hiring expectations for this role.
                </p>
              </div>

              {/* Search input */}
              <div className="relative pt-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
                <input
                  type="text"
                  value={careerSearch}
                  onChange={(e) => setCareerSearch(e.target.value)}
                  placeholder="Search careers (e.g., Backend, Frontend, Cloud, Security)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Career Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1 pt-1">
                {filteredCareers.map((career) => {
                  const isSelected = career.id === selectedCareerId;
                  return (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareerId(career.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xl">
                            {career.id.includes('backend') ? '⚙️' :
                             career.id.includes('frontend') ? '🌐' :
                             career.id.includes('fullstack') ? '🚀' :
                             career.id.includes('cloud') ? '☁️' :
                             career.id.includes('cyber') ? '🛡️' :
                             career.id.includes('data') ? '📊' :
                             career.id.includes('devops') ? '🔧' :
                             career.id.includes('ml') ? '🧠' : '💻'}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                            {career.title}
                          </h4>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                        {career.shortDescription}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {career.toolsAndTech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: UPLOAD RESUME */}
          {currentStep === 2 && (
            <div className="animate-fadeIn space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step 2 of 3: Resume Upload
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                  Upload your resume for qualification analysis
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Upload your current PDF or DOCX file to extract technical competencies, coursework, and project evidence.
                </p>
              </div>

              {/* Demo Transparency Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Simulated Demo Analysis:</strong> Resume extraction in this prototype runs client-side with calibrated fixture data. We transparently label all demo analyses.
                </div>
              </div>

              {/* Validation Error Banner */}
              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Upload Drag & Drop Area */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-white dark:bg-[#131D31] relative hover:border-indigo-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Drop your resume here, or <span className="text-indigo-600 dark:text-indigo-400">browse files</span>
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Supports PDF and DOCX files up to 10 MB
                </p>

                {isUploading && (
                  <div className="mt-4 max-w-xs mx-auto">
                    <ProgressBar value={75} label="Extracting competencies..." size="xs" />
                  </div>
                )}
              </div>

              {/* Selected File Details */}
              {uploadedFile && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {uploadedFile.size} • Ready for Qualification Analysis
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">File Verified</Badge>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ANALYZE QUALIFICATIONS & DISPLAY PATHWAY RESULTS */}
          {currentStep === 3 && (
            <div className="animate-fadeIn space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step 3 of 3: Personalized Pathway Generated
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                  Your qualification roadmap for {selectedCareer.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Here are your verified strengths, identified competency gaps, and the recommended engineering project to qualify.
                </p>
              </div>

              {/* Target Role Card */}
              <Card className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Selected Target Career
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedCareer.title}
                    </h3>
                  </div>
                  <Badge variant="accent">Demand: {selectedCareer.marketDemand}</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {selectedCareer.shortDescription}
                </p>
              </Card>

              {/* 2-Column Split: Demonstrated Strengths vs Gaps to Develop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. What skills you currently demonstrate */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center justify-between">
                    <span>1. Skills Demonstrated</span>
                    <span className="font-mono text-[11px] font-semibold">3 Verified</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Python</span>
                      <EvidenceBadge status="project" />
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-medium text-slate-800 dark:text-slate-200">SQL & Relational Databases</span>
                      <EvidenceBadge status="coursework" />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Git & Version Control</span>
                      <EvidenceBadge status="project" />
                    </div>
                  </div>
                </div>

                {/* 2. What competencies you should develop & why they matter */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2.5 flex items-center justify-between">
                    <span>2. Competency Gaps</span>
                    <span className="font-mono text-[11px] font-semibold">3 Priority Gaps</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 block">Docker & Containers</span>
                        <span className="text-[10px] text-slate-400">Required for cloud runtimes</span>
                      </div>
                      <PriorityBadge priority="high" />
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 block">Redis In-Memory Caching</span>
                        <span className="text-[10px] text-slate-400">Required for low latency</span>
                      </div>
                      <PriorityBadge priority="high" />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 block">AWS Cloud Deployments</span>
                        <span className="text-[10px] text-slate-400">Proves production readiness</span>
                      </div>
                      <PriorityBadge priority="medium" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Recommended Project to Start With */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50/30 dark:from-indigo-950/60 dark:to-[#131D31] border border-indigo-200 dark:border-indigo-800 text-xs">
                <div className="flex items-center justify-between font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <FolderGit2 className="w-4 h-4 text-indigo-500" /> Recommended First Project Blueprint
                  </span>
                  <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                    {recommendedProject.estimatedDuration}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                  {recommendedProject.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {recommendedProject.recommendationExplanation}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {recommendedProject.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => setCurrentStep(currentStep - 1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(currentStep + 1)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {currentStep === 1 ? 'Continue to Resume Upload' : 'Analyze Qualifications & Generate Pathway'}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleFinishOnboarding}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
              className="font-bold shadow-md shadow-indigo-500/20"
            >
              Explore Your Dashboard & Roadmap &rarr;
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};
