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
