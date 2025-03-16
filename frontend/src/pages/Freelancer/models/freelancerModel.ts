export interface Skill {
  skillId: number;
  skillName: string;
}

export interface SkillPerform {
  skill?: Skill;
  skills?: Skill; // Handle both formats from API
  skillLevel: number;
}

export interface PublicPortfolio {
  portfolioId: number;
  freelancerId: number;
  title: string;
  about: string;
  works: string;
  certificate: string;
  status: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: number;
  address: string;
  nationality: string;
  avatarURL: string;
  reputationPoint: number;
  skillPerform?: SkillPerform[];
}

export interface Feedback {
  feedbackId: number;
  freelancerId: number;
  clientId: number;
  rating: number;
  comment: string;
  createdDate: string;
  clientName: string;
  clientAvatar?: string;
  projectName?: string;
  projectId?: number;
}

export interface FeedbackRequest {
  freelancerId: number;
  clientId: number;
  rating: number;
  comment: string;
  projectId?: number;
}
