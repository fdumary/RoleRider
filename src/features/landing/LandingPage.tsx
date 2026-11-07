import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  Layers,
  CheckCircle2,
  FolderGit2,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Terminal,
  Code2,
  Cpu,
  GraduationCap,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge, EvidenceBadge, RubricBadge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Upload Your Resume',
      desc: 'Drag and drop your PDF or DOCX. RoleRider analyzes your demonstrated coursework, projects, and unverified claims.',
      icon: UploadCloud,
    },
    {
      num: '02',
      title: 'Choose Target Career',
      desc: 'Select from 10+ technology roles like Backend Engineer, Cloud Specialist, or Cybersecurity Analyst.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Discover Skill Gaps',
      desc: 'Compare your documented abilities against what engineering managers actually look for in junior hires.',
      icon: BarChart3,
    },
    {
      num: '04',
      title: 'Build Recommended Projects',
      desc: 'Tackle structured projects engineered specifically to address your missing competencies with clear acceptance criteria.',
      icon: FolderGit2,
    },
    {
      num: '05',
      title: 'Demonstrate Your Progress',
      desc: 'Submit repository links, live deployments, and technical reflections to build an undeniable proof-of-work portfolio.',
      icon: ShieldCheck,
    },
  ];

  const features = [
    {
      title: 'AI Resume Intelligence',
      desc: 'Classifies competencies into evidence types: claimed keywords, coursework evidence, and verified project deliverables.',
      icon: Code2,
    },
    {
      title: 'Role Taxonomy & Expectations',
      desc: 'Built on real engineering benchmarks and occupational taxonomies, articulating foundational vs preferred abilities.',
      icon: Cpu,
    },
    {
      title: 'Evidence-Based Rubrics',
      desc: 'Replaces arbitrary percentiles with transparent 4-stage rubrics: Exposure, Foundational, Proficient, and Advanced.',
      icon: GraduationCap,
    },
    {
      title: 'Project Lab Recommendations',
      desc: 'Engineered project blueprints that cover maximum missing skill gaps without overwhelming prerequisite traps.',
      icon: FolderGit2,
    },
    {
      title: 'Interactive Milestone Roadmaps',
      desc: 'Step-by-step phases with checkable tasks, vetted documentation links, and measurable acceptance criteria.',
      icon: Terminal,
    },
    {
      title: 'Portfolio & Proof-of-Work',
      desc: 'A permanent showcase separating self-reported claims from verified code repositories and live cloud deployments.',
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      q: 'How is RoleRider different from traditional resume optimization tools?',
      a: 'Traditional tools only suggest adding buzzwords to your resume to pass automated ATS filters. RoleRider focuses on developing actual technical competencies. It identifies what technical skills you are missing and guides you through building real, production-grade projects to prove your abilities.',
    },
    {
      q: 'Does RoleRider claim to guarantee job placement or score hiring probability?',
      a: 'No. RoleRider strictly avoids misleading hiring probabilities or arbitrary percentage scores. Instead, we provide transparent, rubric-based competency assessments (Exposure, Foundational, Proficient, Advanced) backed by verifiable evidence.',
    },
    {
      q: 'What kind of projects will I build in the Project Lab?',
      a: 'You will build realistic, architecture-focused engineering projects such as a Distributed Inventory System with Redis caching and Docker, an OAuth2/JWT Zero-Trust Identity Gateway, or a Kafka Event Stream Aggregator—complete with milestone tasks, test suites, and documentation guidelines.',
    },
    {
      q: 'Who is RoleRider built for?',
      a: 'RoleRider is engineered specifically for computing and IT university students, recent graduates, bootcamp attendees, and career changers who want to build a competitive, evidence-backed software engineering profile.',
    },
    {
      q: 'How does evidence classification work?',
      a: 'Skills extracted from your background are classified as Claimed (resume buzzword), Coursework (academic assignment), Project (public repository / code artifact), or Assessment. This gives you and recruiters a realistic picture of your verifiable abilities.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Marketing Navigation */}
      <nav className="sticky top-0 z-40 h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" aria-label="RoleRider — Go to homepage" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
            Role<span className="text-indigo-600 dark:text-indigo-400">Rider</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#preview" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            Project Lab
          </a>
          <a href="#faq" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-cyan-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Don't just apply, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400">
              qualify!
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Discover what employers actually expect, understand your verified technical strengths, and build the real-world engineering projects that move your career forward.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-indigo-500/25"
              onClick={() => navigate('/onboarding')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore How It Works
            </Button>
          </div>

          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            Free for students & recent grads • No credit card required • Instant gap analysis
          </p>
        </div>

        {/* Dashboard & Roadmap Interactive Mock Preview (Design inspiration from user's upload) */}
        <div id="preview" className="relative mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0E1626] shadow-2xl p-4 sm:p-6 text-left">
            {/* Top Bar of Preview */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono font-semibold text-slate-400 ml-2">
                  app.rolerider.io/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                  Target: Backend Software Engineer
                </span>
              </div>
            </div>

            {/* Split Preview Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Widget: Skill Gap Analysis */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#131D31]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Skill Gap Analysis
                    </h4>
                  </div>
                  <Badge variant="warning" size="sm">3 Gaps Identified</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Python (Object-Oriented & Async)</span>
                      <span className="text-emerald-500 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Proficient
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[85%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700 dark:text-slate-300">SQL & Relational Schemas</span>
                      <span className="text-indigo-500 font-semibold">Coursework</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[65%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Docker & Containers</span>
                      <span className="text-rose-500 font-semibold">Missing Evidence</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-[15%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Redis In-Memory Caching</span>
                      <span className="text-rose-500 font-semibold">Missing Evidence</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-[0%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Evidence status:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-400">Verified</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500 ml-2" />
                    <span className="text-slate-400">Priority Gap</span>
                  </div>
                </div>
              </div>

              {/* Right Widget: Recommended Project & Milestone Roadmap */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#131D31]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-cyan-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Recommended Engineering Project
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-cyan-500">4-6 Weeks</span>
                </div>

                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Distributed Inventory Management System
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Build high-concurrency order reservation logic with Redis cache-aside, PostgreSQL row locks, and multi-stage Docker.
                </p>

                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                      Phase 1: Architecture & SQLAlchemy Migrations
                    </span>
                    <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                      Done
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800 text-xs">
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-500 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>
                    <span className="font-medium text-indigo-700 dark:text-indigo-300 truncate">
                      Phase 2: FastAPI Endpoints & Concurrency Locking
                    </span>
                    <span className="ml-auto text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800 text-xs opacity-60">
                    <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400 truncate">
                      Phase 3: High-Performance Redis Caching Layer
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Overall Progress: 33%</span>
                  <Link to="/dashboard">
                    <Button variant="primary" size="xs">
                      Enter Live Platform
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (5 Steps) */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How RoleRider Works
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3">
            Five clear, evidence-based steps to bridge the gap between academic learning and production engineering expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {st.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Traditional Resume Tools Fail Students
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3">
            Recruiters and engineering managers don't want keyword-stuffed resumes. They look for proven ability to architect, test, containerize, and deploy working software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} hoverEffect className="p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800/60">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    activeFaq === idx ? 'rotate-180 text-indigo-500' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-950 border border-indigo-800 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Prove What You Know?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-indigo-200 max-w-xl mx-auto leading-relaxed">
            Stop guessing what hiring managers want. Get a transparent competency assessment and start building projects that qualify you for your dream tech career.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/onboarding')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Free Onboarding
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 px-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              <strong className="font-bold text-slate-900 dark:text-white">RoleRider</strong> — Don't just apply, qualify! All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

