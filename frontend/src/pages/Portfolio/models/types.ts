import type { Dayjs } from "dayjs";
import { UserProfileData } from "../../Profile/models/types";

export type TabType = "works" | "skills" | "services" | "about";

export interface PortfolioHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface PortfolioContentProps {
  activeTab: TabType;
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link?: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface Experience {
  position: string;
  company: string;
  startDate: string | null | Dayjs;
  endDate?: string | null | Dayjs;
  description: string;
  isCurrentPosition?: boolean;
}

export interface Certificate {
  title: string;
  issueDate?: string | null | Dayjs;
  url?: string;
}

export interface Works {
  skills: string[];
  experiences: Experience[];
}

export interface SkillPerform {
  skillId: number;
  level: number;
}

// For API response, the skillPerform structure is different
export interface SkillPerformDTO {
  skills: {
    skillId: number;
    skillName: string;
  };
  skillLevel: number;
}

export interface SkillFormItemProps {
  isEditing: boolean;
}

export interface SkillLevelSelectProps {
  name: string | number | (string | number)[];
  label?: string;
  required?: boolean;
}

export interface CreatePortfolioDTO {
  title: string;
  works: string;
  certificate: string;
  about: string;
  content?: string;
  status?: number;
  skillPerforms?: SkillPerform[];
}

export interface PortfolioDTO {
  portfolioId: number;
  freelancerId?: number;
  title: string;
  works: string;
  certificate: string;
  about: string;
  content?: string;
  status?: number;
  skillPerformDTOs?: SkillPerformDTO[];
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  value?: T;
  error?: string;
}

export interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    level: number;
    years: number;
    certified?: boolean;
  }[];
}

export interface AboutInfo {
  bio: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    duration: string;
  }[];
}

export interface PortfolioData extends UserProfileData {
  professionalTitle: string;
  yearsOfExperience: number;
  hourlyRate: number;
  verificationStatus: {
    status: "pending" | "verified" | "rejected";
    lastUpdated: string;
    reviewer?: string;
    notes?: string;
  };
  services: {
    title: string;
    description: string;
    rate: number;
    deliveryTime: string;
    category: string;
  }[];
  projects: {
    title: string;
    description: string;
    role: string;
    technologies: string[];
    duration: string;
    link?: string;
    images: string[];
    feedback?: {
      rating: number;
      comment: string;
      clientName: string;
    };
  }[];
}

export interface PortfolioVersion {
  id: string;
  createdAt: string;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}

export interface PortfolioSEO {
  customUrl?: string;
  title: string;
  description: string;
  keywords: string[];
  visibility: "public" | "private" | "unlisted";
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: {
    amount: number;
    unit: "hour" | "project";
  };
  status: "completed" | "in-progress";
  clientName: string;
  technologies: string[];
  clientSatisfaction?: number;
  completionDate?: string;
  testimonial?: string;
  keyAchievements?: string[];
  progress?: number;
  startDate?: string;
  expectedCompletion?: string;
  milestones?: {
    title: string;
    completed: boolean;
  }[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export enum SkillLevel {
  Entry = 0,
  Intermediate = 1,
  Advanced = 2,
}
