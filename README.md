# RoleRider — Technical Competency & Career Development Platform

> **Don't Just Apply. Qualify.**  
> *Discover what employers expect, understand your technical strengths, and build the skills that move your career forward.*

RoleRider is an evidence-based career development platform engineered for computing and IT students, recent graduates, and career changers. Unlike traditional resume keyword tools that simply optimize buzzwords for ATS filters, RoleRider focuses on developing and proving verifiable engineering competencies through structured, real-world projects.

---

## 🚀 Key Highlights & Differentiators

- **Project Lab (Primary Differentiator):** Real-world, architecture-focused engineering blueprints (e.g., *Distributed Inventory Management System*, *Zero-Trust Identity Gateway*, *Real-Time Kafka Event Streaming Pipeline*) mapped directly to missing skill gaps.
- **Interactive Milestone Workspaces:** Every project includes expandable phases, implementation task checklists, vetted documentation links, acceptance criteria, testable deliverables, and public proof-of-work submission fields (GitHub repo, live deployment, architecture reflections).
- **Evidence-Based Competency Matrix:** Replaces arbitrary numerical scores or hiring probabilities with transparent, rubric-based proficiency levels:
  - `Exposure` — Terminology and syntax awareness
  - `Foundational` — Independent feature implementation using standard patterns
  - `Proficient` — Edge case handling, automated testing, concurrency, and performance optimization
  - `Advanced` — Distributed architecture, high throughput, and system reliability
- **Evidence Classification Engine:** Distinguishes between:
  - `Project Evidence` (verifiable code repository and functional artifacts)
  - `Coursework Evidence` (academic coursework and grade records)
  - `Assessment Evidence` (standardized evaluations)
  - `Claimed / Unverified` (resume keyword claims awaiting code or coursework proof)
- **Career Explorer & Taxonomy:** Curated benchmark profiles for 10+ technology careers (Backend Software Engineer, Frontend Developer, Full-Stack Developer, Cloud Infrastructure Engineer, Cybersecurity Analyst, DevOps Engineer, Data Engineer, Machine Learning Engineer, Mobile App Engineer, IT Systems Specialist).
- **Personalized 4-Stage Career Roadmap:** Foundations &rarr; Applied Development &rarr; Specialized Competencies &rarr; Portfolio Readiness.
- **Verified Portfolio Showcase:** A permanent proof-of-work portfolio separating self-reported claims from verified repositories, live APIs, and reflections.
- **Industry Certifications Explorer:** Curated catalog of recognized credentials (AWS, CompTIA Security+, Kubernetes CKAD, GitHub Foundations, Terraform Associate).
- **Global Search & Command Palette:** Quick jump across all careers, projects, skills, and pages (`Cmd+K` / `Ctrl+K`).
- **Coherent Prototype User:** Unified sample candidate **Alex Morgan** (CS Major, target: *Backend Software Engineer*, active project: *Distributed Inventory System*).
- **State Persistence:** Local storage synchronization for all project progress, task completions, role changes, evidence additions, and settings.

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript (Strict mode enabled)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS with custom design tokens and semantic dark/light modes
- **Routing:** React Router v6
- **State Management:** Zustand with automatic `localStorage` synchronization
- **Icons:** Lucide React
- **Visualizations:** Recharts (Radar competency benchmarks, horizontal bar distributions)
- **Service Layer:** Asynchronous Promise-based API abstractions ready for FastAPI backend connection

---

## 📁 Project Architecture

```text
src/
├── app/
│   ├── router/          # React Router v6 route configuration
│   └── providers/
├── components/
│   ├── ui/              # Reusable component library (Button, Badge, Card, Modal, Input, Tabs, ProgressBar, Toast)
│   ├── layout/          # AppShell, Sidebar, TopNavbar, CommandPalette
│   └── shared/          # Shared icons and helper elements
├── data/
│   └── mockData.ts      # Comprehensive fixtures (Careers, Skills, Projects, Milestones, Certifications, User)
├── features/
│   ├── landing/         # Marketing landing page with interactive preview & FAQ
│   ├── auth/            # Sign in and candidate registration
│   ├── onboarding/      # 5-step guided career setup & simulated resume parsing
│   ├── dashboard/       # Central platform overview, widgets, radar charts, active project
│   ├── careers/         # Career Explorer & deep dive detail views
│   ├── resume/          # Resume analysis & evidence classification editor
│   ├── skills/          # Competency matrix table & skill detail inspection
│   ├── projects/        # Project Lab catalog & interactive milestone workspace
│   ├── roadmap/         # 4-stage personalized career roadmap
│   ├── certifications/  # Curated industry credentials catalog
│   ├── portfolio/       # Proof-of-work showcase & public link manager
│   └── settings/        # Preferences, target career switch & demo data reset
├── services/
│   └── api/             # Future FastAPI integration contracts (authService, careerService, projectService, etc.)
├── store/
│   └── useStore.ts      # Zustand state store with persistent local storage
├── types/
│   └── index.ts         # TypeScript domain interfaces and type definitions
├── utils/
│   └── cn.ts            # ClassNames merging utility (clsx + tailwind-merge)
├── styles/
│   └── index.css        # Tailwind directives and custom animation styles
└── main.tsx             # Application bootstrap
```

---

## 🏃 Running the Application

### 1. Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or the port assigned by Vite).

### 2. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🔌 FastAPI Integration Readiness

The frontend architecture includes a dedicated service layer in `src/services/api/index.ts`. All service functions return typed Promises matching future FastAPI endpoint responses:

| Endpoint | Frontend Service Method | Description |
|---|---|---|
| `GET /api/v1/user/profile` | `authService.getCurrentUser()` | Retrieve authenticated candidate profile |
| `POST /api/v1/resumes/upload` | `resumeService.uploadAndAnalyze(file)` | Upload PDF/DOCX resume for competency parsing |
| `GET /api/v1/careers` | `careerService.getCareers(filters)` | Fetch tech career taxonomy |
| `GET /api/v1/skills/gaps` | `skillService.getSkillGaps(careerId)` | Retrieve ranked competency gaps |
| `GET /api/v1/projects` | `projectService.getProjects(filters)` | Get recommended project blueprints |
| `PATCH /api/v1/projects/{id}/milestones/{mId}` | `projectService.toggleMilestoneTask()` | Update task completion and progress |
| `POST /api/v1/projects/{id}/submission` | `projectService.updateSubmission()` | Save repository URLs and reflections |

---

## 📄 License

MIT License. Built for students, aspiring engineers, and career changers everywhere.
