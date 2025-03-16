export interface Skill {
  skillId: number;
  skillName: string;
}

export interface SkillPerform {
  skill?: Skill;
  skills?: Skill; // Handle both formats from API
  skillLevel: number;
}

export interface VerifiedPortfolio {
  portfolioId: number;
  freelancerId: number;
  title: string;
  about: string;
  name: string;
  email: string;
  avatarURL: string;
  nationality: string;
  reputationPoint: number;
  works: string;
  address?: string;
  skillPerform?: SkillPerform[];
  certificate: string;
  status: number;
  birthday: string;
  gender: number;
  phone: string;
}

export interface VerifiedPortfoliosResponse {
  value: {
    items: VerifiedPortfolio[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}
