import {
  UserProfile,
  Career,
  ResumeData,
  Skill,
  CompetencyEvidence,
  SkillGap,
  Project,
  ProjectSubmission,
  RoadmapStage,
  Certification,
  ActivityItem
} from '../../types';
import { useStore } from '../../store/useStore';
import {
  CAREERS,
  SKILLS_CATALOG,
  PROJECTS,
  CERTIFICATIONS,
  RESUME_FIXTURE,
  ROADMAP_STAGES
} from '../../data/mockData';

// Simulated network delay helper
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async getCurrentUser(): Promise<UserProfile> {
    await delay(100);
    return useStore.getState().user;
  },

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await delay(200);
    useStore.getState().setUser(updates);
    return useStore.getState().user;
  },

  async login(email: string): Promise<UserProfile> {
    await delay(300);
    return useStore.getState().user;
  },

  async logout(): Promise<void> {
    await delay(100);
  },
};

export const careerService = {
  async getCareers(filters?: { category?: string; query?: string }): Promise<Career[]> {
    await delay(120);
    let list = useStore.getState().careers;
    if (filters?.category && filters.category !== 'all') {
      list = list.filter((c) => c.category === filters.category);
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.toolsAndTech.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  },

  async getCareerById(careerId: string): Promise<Career | undefined> {
    await delay(80);
    return useStore.getState().careers.find((c) => c.id === careerId);
  },

  async setTargetCareer(careerId: string): Promise<void> {
    await delay(150);
    useStore.getState().setTargetCareer(careerId);
  },
};

export const skillService = {
  async getAllSkills(): Promise<Skill[]> {
    await delay(100);
    return useStore.getState().skills;
  },

  async getUserEvidences(): Promise<CompetencyEvidence[]> {
    await delay(120);
    return useStore.getState().evidences;
  },

  async getSkillGaps(careerId: string): Promise<SkillGap[]> {
    await delay(150);
    return useStore.getState().skillGaps;
  },

  async addEvidence(evidence: Omit<CompetencyEvidence, 'id' | 'dateAdded'>): Promise<void> {
    await delay(200);
    useStore.getState().addEvidence(evidence);
  },

  async updateEvidence(id: string, updates: Partial<CompetencyEvidence>): Promise<void> {
    await delay(150);
    useStore.getState().updateEvidence(id, updates);
  },
};

export const projectService = {
  async getProjects(filters?: {
    difficulty?: string;
    careerId?: string;
    query?: string;
  }): Promise<Project[]> {
    await delay(120);
    let list = useStore.getState().projects;
    if (filters?.difficulty && filters.difficulty !== 'all') {
      list = list.filter((p) => p.difficulty === filters.difficulty);
    }
    if (filters?.careerId) {
      list = list.filter((p) => p.careerIds.includes(filters.careerId!));
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  },

  async getProjectById(projectId: string): Promise<Project | undefined> {
    await delay(100);
    return useStore.getState().projects.find((p) => p.id === projectId || p.slug === projectId);
  },

  async startProject(projectId: string): Promise<void> {
    await delay(200);
    useStore.getState().startProject(projectId);
  },

  async toggleMilestoneTask(projectId: string, milestoneId: string, taskId: string): Promise<void> {
    useStore.getState().toggleMilestoneTask(projectId, milestoneId, taskId);
  },

  async toggleMilestone(projectId: string, milestoneId: string): Promise<void> {
    useStore.getState().toggleMilestone(projectId, milestoneId);
  },

  async updateSubmission(projectId: string, updates: Partial<ProjectSubmission>): Promise<void> {
    await delay(150);
    useStore.getState().updateProjectSubmission(projectId, updates);
  },

  async getSubmissions(): Promise<Record<string, ProjectSubmission>> {
    await delay(80);
    return useStore.getState().submissions;
  },
};

export const resumeService = {
  async getResume(): Promise<ResumeData> {
    await delay(100);
    return useStore.getState().resumeData;
  },

  async uploadAndAnalyze(file: File): Promise<ResumeData> {
    await delay(1200); // simulate realistic parsing and extraction
    const simulated: ResumeData = {
      ...RESUME_FIXTURE,
      fileName: file.name,
      fileSize: `${Math.round(file.size / 1024)} KB`,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isSimulated: true,
    };
    useStore.getState().setSimulatedResume(simulated);
    return simulated;
  },
};

export const roadmapService = {
  async getRoadmap(careerId: string): Promise<RoadmapStage[]> {
    await delay(100);
    return useStore.getState().roadmapStages;
  },
};

export const certificationService = {
  async getCertifications(careerId?: string): Promise<Certification[]> {
    await delay(100);
    let list = useStore.getState().certifications;
    if (careerId) {
      list = list.filter((c) => c.relevantCareerIds.includes(careerId));
    }
    return list;
  },
};

