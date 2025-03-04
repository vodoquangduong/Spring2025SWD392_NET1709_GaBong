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
}
