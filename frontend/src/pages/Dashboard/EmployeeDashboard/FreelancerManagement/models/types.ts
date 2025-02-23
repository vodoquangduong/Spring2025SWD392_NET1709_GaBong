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
