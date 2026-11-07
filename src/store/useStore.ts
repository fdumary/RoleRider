import { create } from 'zustand';
import {
  UserProfile,
  Career,
  Skill,
  CompetencyEvidence,
  SkillGap,
  Project,
  ProjectSubmission,
  RoadmapStage,
  Certification,
  ResumeData,
  ActivityItem,
  ResumeSkillItem,
  EvidenceStatus,
  RubricLevel,
  AuthSession
} from '../types';
import {
  INITIAL_USER,
  CAREERS,
  SKILLS_CATALOG,
  INITIAL_EVIDENCES,
  INITIAL_SKILL_GAPS,
  PROJECTS,
  INITIAL_SUBMISSIONS,
  ROADMAP_STAGES,
  CERTIFICATIONS,
  RESUME_FIXTURE,
  INITIAL_ACTIVITIES
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

interface AppState {
  // Session & Auth
  session: AuthSession;
  setGuestSession: (token: string, guestId: string, expiresInSeconds?: number) => void;
  checkSessionExpiration: () => boolean;
  clearSession: () => void;

  // User & Onboarding
  user: UserProfile;
  setUser: (user: Partial<UserProfile>) => void;
  setTargetCareer: (careerId: string) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  resetOnboarding: () => void;

  // Careers & Skills
  careers: Career[];
  skills: Skill[];
  evidences: CompetencyEvidence[];
  skillGaps: SkillGap[];
  addEvidence: (evidence: Omit<CompetencyEvidence, 'id' | 'dateAdded'>) => void;
  updateEvidence: (id: string, updates: Partial<CompetencyEvidence>) => void;

  // Projects & Progress
  projects: Project[];
  submissions: Record<string, ProjectSubmission>;
  startProject: (projectId: string) => void;
  toggleMilestoneTask: (projectId: string, milestoneId: string, taskId: string) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  updateProjectSubmission: (projectId: string, updates: Partial<ProjectSubmission>) => void;

  // Resume Analysis
  resumeData: ResumeData;
  updateResumeSkills: (skills: ResumeSkillItem[]) => void;
  addResumeSkill: (skill: Omit<ResumeSkillItem, 'id'>) => void;
  removeResumeSkill: (id: string) => void;
  setSimulatedResume: (resume: ResumeData) => void;

  // Roadmap & Certifications
  roadmapStages: RoadmapStage[];
  certifications: Certification[];

  // Activity Feed
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;

  // UI State
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Reset
  resetDemoData: () => void;
}

const STORAGE_KEY = 'rolerider_storage_state_v1';

const getStoredState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load local storage state:', err);
  }
  return null;
};

const DEFAULT_SESSION: AuthSession = {
  accessToken: null,
  guestId: null,
  role: null,
  isGuest: false,
  expiresAt: null,
  isAuthenticated: false,
};

const saveState = (state: Partial<AppState>) => {
  try {
    const dataToSave = {
      session: state.session,
      user: state.user,
      evidences: state.evidences,
      skillGaps: state.skillGaps,
      submissions: state.submissions,
      resumeData: state.resumeData,
      roadmapStages: state.roadmapStages,
      activities: state.activities,
      theme: state.theme,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error('Failed to save state to local storage:', err);
  }
};

const initialSaved = getStoredState();

export const useStore = create<AppState>((set, get) => ({
  session: initialSaved?.session || DEFAULT_SESSION,
  user: initialSaved?.user || INITIAL_USER,
  careers: CAREERS,
  skills: SKILLS_CATALOG,
  evidences: initialSaved?.evidences || INITIAL_EVIDENCES,
  skillGaps: initialSaved?.skillGaps || INITIAL_SKILL_GAPS,
  projects: PROJECTS,
  submissions: initialSaved?.submissions || INITIAL_SUBMISSIONS,
  roadmapStages: initialSaved?.roadmapStages || ROADMAP_STAGES,
  certifications: CERTIFICATIONS,
  resumeData: initialSaved?.resumeData || RESUME_FIXTURE,
  activities: initialSaved?.activities || INITIAL_ACTIVITIES,
  theme: (initialSaved?.theme as 'dark' | 'light') || 'dark', // default to dark modern theme as requested in wireframes
  isSearchOpen: false,
  toasts: [],

  setGuestSession: (token, guestId, expiresInSeconds = 3600) => {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    const session: AuthSession = {
      accessToken: token,
      guestId,
      role: 'guest',
      isGuest: true,
      expiresAt,
      isAuthenticated: true,
    };
    set((state) => {
      const nextUser: UserProfile = {
        ...state.user,
        id: guestId,
        name: `Guest Candidate (${guestId.slice(-4)})`,
        email: 'guest@rolerider.io',
        headline: 'Guest Explorer — Evaluating Technical Career Pathways',
        isGuest: true,
        onboardingCompleted: false,
      };
      const act: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'evidence_added',
        title: 'Guest Session Initiated',
        description: 'Authenticated with 60-minute guest access token.',
        timestamp: 'Just now',
        link: '/onboarding',
      };
      const nextActivities = [act, ...state.activities.slice(0, 19)];
      const nextState = { ...state, session, user: nextUser, activities: nextActivities };
      saveState(nextState);
      return { session, user: nextUser, activities: nextActivities };
    });
  },

  checkSessionExpiration: () => {
    const { session } = get();
    if (!session.isAuthenticated) return false;
    if (session.expiresAt && Date.now() > session.expiresAt) {
      get().clearSession();
      get().addToast({
        type: 'warning',
        title: 'Guest Session Expired',
        message: 'Your 60-minute guest session has ended. Click "Continue as Guest" to restart.',
      });
      return false;
    }
    return true;
  },

  clearSession: () => {
    set((state) => {
      const nextSession = DEFAULT_SESSION;
      const nextState = { ...state, session: nextSession };
      saveState(nextState);
      return { session: nextSession };
    });
  },

  setUser: (updates) => {
    set((state) => {
      const nextUser = { ...state.user, ...updates };
      const nextState = { ...state, user: nextUser };
      saveState(nextState);
      return { user: nextUser };
    });
  },

  setTargetCareer: (careerId) => {
    set((state) => {
      const targetCareer = state.careers.find(c => c.id === careerId);
      const nextUser = { ...state.user, targetCareerId: careerId };
      const act: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'competency_updated',
        title: 'Target Career Updated',
        description: `Set target role to ${targetCareer?.title || careerId}`,
        timestamp: 'Just now',
        link: `/careers/${careerId}`,
      };
      const nextActivities = [act, ...state.activities.slice(0, 19)];
      const nextState = { ...state, user: nextUser, activities: nextActivities };
      saveState(nextState);
      return { user: nextUser, activities: nextActivities };
    });
    get().addToast({
      type: 'success',
      title: 'Target Career Updated',
      message: 'Your roadmap and recommended projects have been refreshed.',
    });
  },

  completeOnboarding: (data) => {
    set((state) => {
      const nextUser = { ...state.user, ...data, onboardingCompleted: true };
      const nextState = { ...state, user: nextUser };
      saveState(nextState);
      return { user: nextUser };
    });
  },

  resetOnboarding: () => {
    set((state) => {
      const nextUser = { ...state.user, onboardingCompleted: false };
      const nextState = { ...state, user: nextUser };
      saveState(nextState);
      return { user: nextUser };
    });
  },

  addEvidence: (evidence) => {
    set((state) => {
      const newEv: CompetencyEvidence = {
        ...evidence,
        id: `ev-${Date.now()}`,
        dateAdded: new Date().toISOString().split('T')[0],
      };
      const nextEvidences = [...state.evidences.filter(e => e.skillId !== evidence.skillId), newEv];
      const act: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'evidence_added',
        title: 'New Competency Evidence',
        description: `Linked ${evidence.skillName} evidence: ${evidence.source}`,
        timestamp: 'Just now',
        link: '/skills',
      };
      const nextActivities = [act, ...state.activities.slice(0, 19)];
      const nextState = { ...state, evidences: nextEvidences, activities: nextActivities };
      saveState(nextState);
      return { evidences: nextEvidences, activities: nextActivities };
    });
  },

  updateEvidence: (id, updates) => {
    set((state) => {
      const nextEvidences = state.evidences.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      );
      const nextState = { ...state, evidences: nextEvidences };
      saveState(nextState);
      return { evidences: nextEvidences };
    });
  },

  startProject: (projectId) => {
    set((state) => {
      const existing = state.submissions[projectId];
      const project = state.projects.find(p => p.id === projectId);
      const submission: ProjectSubmission = existing || {
        projectId,
        githubUrl: '',
        liveUrl: '',
        docsUrl: '',
        reflectionNotes: '',
        isStarted: true,
        isCompleted: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        completedMilestoneIds: [],
        completedTaskIds: [],
      };
      submission.isStarted = true;

      const nextSubmissions = { ...state.submissions, [projectId]: submission };
      const act: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'project_started',
        title: 'Started Project Workspace',
        description: `Enrolled in ${project?.title || projectId}`,
        timestamp: 'Just now',
        link: `/projects/${projectId}`,
      };
      const nextActivities = [act, ...state.activities.slice(0, 19)];
      const nextState = { ...state, submissions: nextSubmissions, activities: nextActivities };
      saveState(nextState);
      return { submissions: nextSubmissions, activities: nextActivities };
    });
    get().addToast({
      type: 'success',
      title: 'Project Started!',
      message: 'Milestones and development tasks are now unlocked in your workspace.',
    });
  },

  toggleMilestoneTask: (projectId, milestoneId, taskId) => {
    set((state) => {
      const sub = state.submissions[projectId] || {
        projectId,
        githubUrl: '',
        liveUrl: '',
        docsUrl: '',
        reflectionNotes: '',
        isStarted: true,
        isCompleted: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        completedMilestoneIds: [],
        completedTaskIds: [],
      };

      const isTaskDone = sub.completedTaskIds.includes(taskId);
      const nextTasks = isTaskDone
        ? sub.completedTaskIds.filter(id => id !== taskId)
        : [...sub.completedTaskIds, taskId];

      // Check if all tasks in this milestone are now done
      const proj = state.projects.find(p => p.id === projectId);
      const milestone = proj?.milestones.find(m => m.id === milestoneId);
      const allTasksDone = milestone ? milestone.implementationTasks.every(t => nextTasks.includes(t.id)) : false;

      let nextMilestones = sub.completedMilestoneIds;
      if (allTasksDone && !sub.completedMilestoneIds.includes(milestoneId)) {
        nextMilestones = [...sub.completedMilestoneIds, milestoneId];
      } else if (!allTasksDone && sub.completedMilestoneIds.includes(milestoneId)) {
        nextMilestones = sub.completedMilestoneIds.filter(id => id !== milestoneId);
      }

      const totalMilestones = proj?.milestones.length || 1;
      const isProjectDone = nextMilestones.length >= totalMilestones;

      const nextSubmissions = {
        ...state.submissions,
        [projectId]: {
          ...sub,
          completedTaskIds: nextTasks,
          completedMilestoneIds: nextMilestones,
          isCompleted: isProjectDone,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
      };

      const nextState = { ...state, submissions: nextSubmissions };
      saveState(nextState);
      return { submissions: nextSubmissions };
    });
  },

  toggleMilestone: (projectId, milestoneId) => {
    set((state) => {
      const sub = state.submissions[projectId] || {
        projectId,
        githubUrl: '',
        liveUrl: '',
        docsUrl: '',
        reflectionNotes: '',
        isStarted: true,
        isCompleted: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        completedMilestoneIds: [],
        completedTaskIds: [],
      };

      const isCompleted = sub.completedMilestoneIds.includes(milestoneId);
      const proj = state.projects.find(p => p.id === projectId);
      const milestone = proj?.milestones.find(m => m.id === milestoneId);
      const taskIds = milestone?.implementationTasks.map(t => t.id) || [];

      let nextMilestones: string[];
      let nextTasks = [...sub.completedTaskIds];

      if (isCompleted) {
        nextMilestones = sub.completedMilestoneIds.filter(id => id !== milestoneId);
        nextTasks = nextTasks.filter(id => !taskIds.includes(id));
      } else {
        nextMilestones = [...sub.completedMilestoneIds, milestoneId];
        taskIds.forEach(tid => {
          if (!nextTasks.includes(tid)) nextTasks.push(tid);
        });
      }

      const totalMilestones = proj?.milestones.length || 1;
      const isProjectDone = nextMilestones.length >= totalMilestones;

      const nextSubmissions = {
        ...state.submissions,
        [projectId]: {
          ...sub,
          completedMilestoneIds: nextMilestones,
          completedTaskIds: nextTasks,
          isCompleted: isProjectDone,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
      };

      let nextActivities = state.activities;
      if (!isCompleted && milestone) {
        const act: ActivityItem = {
          id: `act-${Date.now()}`,
          type: 'milestone_completed',
          title: `Completed ${milestone.title}`,
          description: `Finished ${milestone.implementationTasks.length} tasks and validated acceptance criteria.`,
          timestamp: 'Just now',
          link: `/projects/${projectId}`,
        };
        nextActivities = [act, ...state.activities.slice(0, 19)];
      }

      const nextState = { ...state, submissions: nextSubmissions, activities: nextActivities };
      saveState(nextState);
      return { submissions: nextSubmissions, activities: nextActivities };
    });
  },

  updateProjectSubmission: (projectId, updates) => {
    set((state) => {
      const current = state.submissions[projectId] || {
        projectId,
        githubUrl: '',
        liveUrl: '',
        docsUrl: '',
        reflectionNotes: '',
        isStarted: true,
        isCompleted: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        completedMilestoneIds: [],
        completedTaskIds: [],
      };
      const updated = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      const nextSubmissions = { ...state.submissions, [projectId]: updated };
      const nextState = { ...state, submissions: nextSubmissions };
      saveState(nextState);
      return { submissions: nextSubmissions };
    });
    get().addToast({
      type: 'success',
      title: 'Project Evidence Saved',
      message: 'Your repository links and technical reflection have been recorded.',
    });
  },

  updateResumeSkills: (skills) => {
    set((state) => {
      const nextResume = { ...state.resumeData, skills };
      const nextState = { ...state, resumeData: nextResume };
      saveState(nextState);
      return { resumeData: nextResume };
    });
  },

  addResumeSkill: (newSkill) => {
    set((state) => {
      const skillItem: ResumeSkillItem = {
        ...newSkill,
        id: `rskill-${Date.now()}`,
      };
      const nextSkills = [...state.resumeData.skills, skillItem];
      const nextResume = { ...state.resumeData, skills: nextSkills };
      const nextState = { ...state, resumeData: nextResume };
      saveState(nextState);
      return { resumeData: nextResume };
    });
  },

  removeResumeSkill: (id) => {
    set((state) => {
      const nextSkills = state.resumeData.skills.filter(s => s.id !== id);
      const nextResume = { ...state.resumeData, skills: nextSkills };
      const nextState = { ...state, resumeData: nextResume };
      saveState(nextState);
      return { resumeData: nextResume };
    });
  },

  setSimulatedResume: (resume) => {
    set((state) => {
      const act: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'resume_analyzed',
        title: 'Resume Analyzed (Simulated)',
        description: `Processed ${resume.fileName} (${resume.skills.length} competencies extracted)`,
        timestamp: 'Just now',
        link: '/resume',
      };
      const nextActivities = [act, ...state.activities.slice(0, 19)];
      const nextState = { ...state, resumeData: resume, activities: nextActivities };
      saveState(nextState);
      return { resumeData: resume, activities: nextActivities };
    });
  },

  addActivity: (activity) => {
    set((state) => {
      const newAct: ActivityItem = {
        ...activity,
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
      };
      const nextActivities = [newAct, ...state.activities.slice(0, 19)];
      const nextState = { ...state, activities: nextActivities };
      saveState(nextState);
      return { activities: nextActivities };
    });
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme: 'dark' | 'light' = state.theme === 'dark' ? 'light' : 'dark';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      const nextState: Partial<AppState> = { ...state, theme: nextTheme };
      saveState(nextState);
      return { theme: nextTheme };
    });
  },

  setTheme: (theme) => {
    set((state) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      const nextState = { ...state, theme };
      saveState(nextState);
      return { theme };
    });
  },

  setSearchOpen: (open) => set({ isSearchOpen: open }),

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, toast.duration || 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },

  resetDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      user: INITIAL_USER,
      careers: CAREERS,
      skills: SKILLS_CATALOG,
      evidences: INITIAL_EVIDENCES,
      skillGaps: INITIAL_SKILL_GAPS,
      projects: PROJECTS,
      submissions: INITIAL_SUBMISSIONS,
      roadmapStages: ROADMAP_STAGES,
      certifications: CERTIFICATIONS,
      resumeData: RESUME_FIXTURE,
      activities: INITIAL_ACTIVITIES,
      theme: 'dark',
    });
    document.documentElement.classList.add('dark');
    get().addToast({
      type: 'info',
      title: 'Demo Data Restored',
      message: 'All prototype states have been reset to default values.',
    });
  },
}));
