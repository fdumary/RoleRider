import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Info
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge, EvidenceBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ExperienceLevel, DifficultyLevel } from '../../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    careers,
    completeOnboarding,
    addToast,
    resumeData,
    setSimulatedResume
  } = useStore();

  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [selectedCareerId, setSelectedCareerId] = useState(user.targetCareerId || 'backend-engineer');
  const [careerSearch, setCareerSearch] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(user.experienceLevel || 'student');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>({
    name: resumeData.fileName,
    size: resumeData.fileSize,
    type: 'application/pdf',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [weeklyHours, setWeeklyHours] = useState(user.weeklyHours || 12);
  const [preferredDifficulty, setPreferredDifficulty] = useState<DifficultyLevel>(user.preferredDifficulty || 'intermediate');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(user.preferredLanguages || ['Python', 'SQL']);

  const totalSteps = 5;

  const experienceOptions: { id: ExperienceLevel; label: string; desc: string }[] = [
    { id: 'just_starting', label: 'Just Starting Out', desc: 'Learning programming fundamentals and introductory computer science.' },
    { id: 'student', label: 'College / University Student', desc: 'Enrolled in an undergraduate or graduate computing/IT degree program.' },
    { id: 'recent_graduate', label: 'Recent Graduate', desc: 'Graduated within the last 12 months, seeking your first full-time role.' },
    { id: 'career_changer', label: 'Career Changer', desc: 'Transitioning into technology from a non-computing professional background.' },
    { id: 'early_career', label: 'Early-Career Professional', desc: '1–2 years of experience looking to level up to mid-level engineering.' },
  ];

  const languagesList = ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Go', 'C++', 'Rust', 'C#'];

  const filteredCareers = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(careerSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(careerSearch.toLowerCase()) ||
      c.toolsAndTech.some((t) => t.toLowerCase().includes(careerSearch.toLowerCase()))
  );

  const selectedCareer = careers.find((c) => c.id === selectedCareerId) || careers[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      alert('Please upload a valid PDF or DOCX file.');
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
      addToast({
        type: 'info',
        title: 'Resume Analyzed (Demo Simulation)',
        message: `Extracted competencies from ${file.name}. Clearly labeled as simulated prototype data.`,
      });
    }, 1000);
  };

  const handleFinish = () => {
    completeOnboarding({
      targetCareerId: selectedCareerId,
      experienceLevel,
      weeklyHours,
      preferredDifficulty,
      preferredLanguages: selectedLanguages,
    });
    addToast({
      type: 'success',
      title: 'Welcome to RoleRider!',
      message: `Your roadmap for ${selectedCareer.title} has been established.`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1626] px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            Role<span className="text-indigo-600 dark:text-indigo-400">Rider</span>
          </span>
          <span className="text-slate-400 dark:text-slate-600 text-sm hidden sm:inline">|</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Guided Career Setup</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
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
          {/* STEP 1: CAREER GOALS */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Step 1 of 5: Career Objective
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                What is your target technology career?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Choose the role you want to qualify for. RoleRider will tailor all skill benchmarks, gap analyses, and project roadmaps to this career.
              </p>

              {/* Search input */}
              <div className="mt-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={careerSearch}
                  onChange={(e) => setCareerSearch(e.target.value)}
                  placeholder="Search roles (e.g., Backend, Frontend, Cloud, Security)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Career Cards Grid */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredCareers.map((career) => {
                  const isSelected = career.id === selectedCareerId;
                  return (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareerId(career.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm'
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

          {/* STEP 2: EXPERIENCE LEVEL */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Step 2 of 5: Candidate Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                What best describes your current experience?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                This helps calibrate milestone difficulty and reasonable prerequisite expectations.
              </p>

              <div className="mt-6 space-y-3">
                {experienceOptions.map((opt) => {
                  const isSelected = opt.id === experienceLevel;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setExperienceLevel(opt.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {opt.label}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {opt.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: RESUME UPLOAD */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Step 3 of 5: Documented Evidence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                Upload your resume for skill parsing
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Upload your current PDF or DOCX resume. In this prototype, our engine simulates extraction using realistic fixture data.
              </p>

              {/* Demo transparency banner */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Prototype Simulation Note:</strong> Resume extraction in this demo runs client-side with pre-calibrated sample data. We never pretend an actual unvetted AI model made real hiring determinations.
                </div>
              </div>

              {/* Upload Drag & Drop Box */}
              <div className="mt-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-white dark:bg-[#131D31] relative hover:border-indigo-500 transition-colors">
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
                    <ProgressBar value={70} label="Extracting competencies..." size="xs" />
                  </div>
                )}
              </div>

              {/* Currently Selected File */}
              {uploadedFile && (
                <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {uploadedFile.size} • Demo Fixture Loaded
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Ready</Badge>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: DEVELOPMENT PREFERENCES */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Step 4 of 5: Project Preferences
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                How do you prefer to build?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Configure your weekly schedule and preferred technical languages to generate realistic project milestones.
              </p>

              <div className="mt-6 space-y-6">
                {/* Weekly Hours */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Weekly Time Commitment: <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{weeklyHours} hours/week</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={30}
                    step={2}
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>4 hrs (Light)</span>
                    <span>12 hrs (Balanced)</span>
                    <span>30 hrs (Intensive Bootcamp)</span>
                  </div>
                </div>

                {/* Preferred Difficulty */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                    Target Project Difficulty
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setPreferredDifficulty(diff)}
                        className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                          preferredDifficulty === diff
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Languages */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                    Primary Languages / Tools of Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languagesList.map((lang) => {
                      const isChecked = selectedLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            if (isChecked) {
                              setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
                            } else {
                              setSelectedLanguages([...selectedLanguages, lang]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            isChecked
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-white dark:bg-[#131D31] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PERSONALIZED PREVIEW */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Step 5 of 5: Personalized Preview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                Your Career Roadmap is Ready
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Here is a summary of your target role benchmarks and initial competency gap analysis.
              </p>

              <div className="mt-6 space-y-4">
                {/* Target Role Card */}
                <Card className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Target Career Role
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedCareer.title}
                      </h3>
                    </div>
                    <Badge variant="accent">Demand: {selectedCareer.marketDemand}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {selectedCareer.shortDescription}
                  </p>
                </Card>

                {/* Gaps Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                      Extracted Strengths (4)
                    </h4>
                    <div className="space-y-1.5 text-xs">
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

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                      Target Gaps to Build (3)
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-medium text-slate-800 dark:text-slate-200">Docker & Containers</span>
                        <EvidenceBadge status="unverified" />
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-medium text-slate-800 dark:text-slate-200">Redis In-Memory Caching</span>
                        <EvidenceBadge status="none" />
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="font-medium text-slate-800 dark:text-slate-200">AWS Cloud Deployments</span>
                        <EvidenceBadge status="none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Project Blueprint */}
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs">
                  <div className="flex items-center justify-between font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                    <span>First Recommended Project:</span>
                    <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">4-6 Weeks</span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    Distributed Inventory Management System
                  </p>
                  <p className="text-indigo-800/80 dark:text-indigo-300/80 mt-1">
                    Covers Redis caching, Docker containerization, PostgreSQL locking, and automated testing with pytest.
                  </p>
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
              Next Step
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleFinish}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Finish & Enter Dashboard
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

