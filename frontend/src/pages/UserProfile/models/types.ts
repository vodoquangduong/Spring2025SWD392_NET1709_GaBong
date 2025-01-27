export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Portfolio {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  location: string;
  website: string;
  bio: string;
  profileImage: string;
  socials: Social;
  skills: string[];
  certifications: Certification[];
  experience: Experience[];
  education: Education[];
  portfolio: Portfolio[];
  timezone: string;
}

// Props interfaces for components
export interface HeroSectionProps {
  profile: UserProfileData;
}

export interface ExperienceProps {
  experience: Experience[];
}

export interface CertificationsProps {
  certifications: Certification[];
}

export interface SkillsProps {
  skills: string[];
}
