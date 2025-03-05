export interface Freelancer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  skills: string[];
  rating: number;
  totalProjects: number;
  completedProjects: number;
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastActive: string;
}

export interface FreelancerDetail extends Freelancer {
  description: string;
  portfolio: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    field: string;
    from: string;
    to: string;
  }[];
  experience: {
    id: string;
    company: string;
    position: string;
    description: string;
    from: string;
    to: string;
  }[];
  certificates: {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialUrl?: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    projectId: string;
    projectName: string;
    reviewerId: string;
    reviewerName: string;
    reviewerAvatar: string;
    createdAt: string;
  }[];
}
export interface PendingPortfolio {
  portfolioId: number;
  freelancerId: number;
  title: string;
  works: string;
  certificate: string;
  about: string;
  status: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarURL: string;
  birthday: string;
  gender: number;
  nationality: string;
  reputationPoint: number;
}

export interface PendingPortfoliosResponse {
  value: {
    items: PendingPortfolio[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}
