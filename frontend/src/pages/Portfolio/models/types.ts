import { ReactNode } from "react";

export type TabType = "works" | "skills" | "about";

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
  icon: ReactNode;
  skills: {
    name: string;
    level: number; // 1-5
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
