export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  location: string;
  website?: string;
  bio: string;
  profileImage: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills: string[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
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
  languages: {
    name: string;
    level: string;
  }[];
  role: "admin" | "staff" | "client" | "freelancer" | "user";
}

export interface HeroSectionProps {
  profile: UserProfileData;
}

export interface ExperienceProps {
  experience: UserProfileData["experience"];
}

export interface SkillsProps {
  skills: UserProfileData["skills"];
}

export interface CertificationsProps {
  certifications: UserProfileData["certifications"];
}

export interface EducationProps {
  education: UserProfileData["education"];
}

export interface LanguagesProps {
  languages: UserProfileData["languages"];
}

export type TabType =
  | "about"
  | "education"
  | "certification"
  | "skills"
  | "languages";
