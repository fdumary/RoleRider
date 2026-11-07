export type RubricLevel = 'none' | 'exposure' | 'foundational' | 'proficient' | 'advanced';

export type EvidenceStatus =
  | 'claimed'
  | 'coursework'
  | 'project'
  | 'assessment'
  | 'unverified'
  | 'none';

export type PriorityLevel = 'high' | 'medium' | 'low';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type ExperienceLevel =
  | 'just_starting'
  | 'student'
  | 'recent_graduate'
  | 'career_changer'
  | 'early_career';

export interface AuthSession {
  accessToken: string | null;
  guestId: string | null;
  role: 'guest' | 'user' | null;
  isGuest: boolean;
  expiresAt: number | null; // epoch ms
  isAuthenticated: boolean;
}

export interface GuestAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    role: 'guest' | 'user';
    is_guest: boolean;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  headline: string;
  experienceLevel: ExperienceLevel;
  targetCareerId: string;
  weeklyHours: number;
  preferredDifficulty: DifficultyLevel;
  careerInterests: string[];
  preferredLanguages: string[];
  onboardingCompleted: boolean;
  avatarUrl?: string;
  joinedDate: string;
  isGuest?: boolean;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  typicalResponsibilities: string[];
  toolsAndTech: string[];
  foundationalSkills: string[];
  requestedSkills: string[];
  preferredSkills: string[];
  educationRequirements: string[];
  relevantCertifications: string[];
  recommendedProjectIds: string[];
  icon: string; // lucide icon identifier
  marketDemand: 'High' | 'Very High' | 'Critical';
}

export interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'backend' | 'frontend' | 'databases' | 'cloud' | 'testing' | 'security' | 'devops' | 'architecture';
  description: string;
  employerValue: string;
  proficiencyRubrics: {
    exposure: string;
    foundational: string;
    proficient: string;
    advanced: string;
  };
}

export interface CompetencyEvidence {
  id: string;
  skillId: string;
  skillName: string;
  category: string;
  status: EvidenceStatus;
  currentLevel: RubricLevel;
  source: string;
  confidence: number; // 0 to 100
  limitations: string;
  dateAdded: string;
  verified: boolean;
  disputeNotes?: string;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  category: string;
  currentLevel: RubricLevel;
  targetLevel: RubricLevel;
  priority: PriorityLevel;
  evidenceStatus: EvidenceStatus;
  gapReason: string;
  importanceExplanation: string;
  recommendedProjectIds: string[];
  learningResourceIds: string[];
}

export interface ImplementationTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'article' | 'course' | 'github' | 'book' | 'video';
  provider: string;
  estimatedMinutes: number;
  free: boolean;
}

export interface ProjectMilestone {
  id: string;
  order: number;
  title: string;
  objective: string;
  skillsDeveloped: string[];
  implementationTasks: ImplementationTask[];
  learningResources: LearningResource[];
  completionCriteria: string;
  deliverables: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  realWorldProblem: string;
  expectedOutcome: string;
  difficulty: DifficultyLevel;
  estimatedDuration: string;
  technologies: string[];
  competenciesDeveloped: string[];
  prerequisites: string[];
  finalDeliverables: string[];
  recommendationExplanation: string;
  careerIds: string[];
  milestones: ProjectMilestone[];
}

export interface ProjectSubmission {
  projectId: string;
  githubUrl: string;
  liveUrl: string;
  docsUrl: string;
  reflectionNotes: string;
  isStarted: boolean;
  isCompleted: boolean;
  lastUpdated: string;
  completedMilestoneIds: string[];
  completedTaskIds: string[];
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  description: string;
  skillsToDevelop: string[];
  projectIds: string[];
  completionRequirements: string[];
  status: 'locked' | 'in_progress' | 'completed';
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  relevantCareerIds: string[];
  difficulty: 'Foundational' | 'Associate' | 'Professional' | 'Specialty';
  prerequisites: string;
  officialUrl: string;
  classification: 'Required' | 'Commonly Requested' | 'Optional / Bonus';
  category: string;
  description: string;
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  coursework: string[];
}

export interface ResumeSkillItem {
  id: string;
  name: string;
  category: string;
  evidenceStatus: EvidenceStatus;
  yearsExperience?: string;
}

export interface ResumeExperience {
  id: string;
  position: string;
  organization: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  demonstratedCompetencies: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuingOrganization: string;
  status: string;
}

export interface ResumeData {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  isSimulated: boolean;
  education: ResumeEducation[];
  skills: ResumeSkillItem[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
}

export interface ActivityItem {
  id: string;
  type: 'milestone_completed' | 'project_started' | 'evidence_added' | 'competency_updated' | 'resume_analyzed';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}
