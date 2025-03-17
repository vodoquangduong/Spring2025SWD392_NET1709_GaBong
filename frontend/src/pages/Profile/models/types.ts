export interface UserProfileData {
  accountId: number;
  role: "freelancer" | "client" | "staff" | "admin" | 2;
  lastName: string;
  firstName: string;
  profession: string;
  location: string;
  bio: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarURL: string;
  birthday: string;
  gender: number;
  nationality: string;
  reputationPoint: number;
  totalCredit: number;
  lockCredit: number;
  createdAt: string;
  languages: {
    name: string;
    level: string;
  }[];
  profileImage: string;
  status: number;
  website: string;
  education: {
    school: string;
    degree: string;
    duration: string;
  }[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

// Portfolio related interfaces
export interface Portfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  technologies: string[];
  completedDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  status: "open" | "in_progress" | "completed" | "cancelled";
  completedDate?: string;
  clientFeedback?: string;
  rating?: number;
  skills: string[];
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "pending" | "completed" | "failed";
}

export interface ExperienceProps {
  experience: {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    duration: string;
  }[];
}

export interface SkillsProps {
  skills: string[];
}
