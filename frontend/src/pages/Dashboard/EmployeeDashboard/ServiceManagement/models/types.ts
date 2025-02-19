export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  status: "active" | "inactive" | "pending";
  rating: number;
  totalReviews: number;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ServiceDetail extends Service {
  requirements: string[];
  deliverables: string[];
  timeline: string;
  revisions: number;
  tags: string[];
  images: string[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  }[];
  statistics: {
    ordersCompleted: number;
    totalEarnings: number;
    averageResponseTime: string;
    completionRate: number;
  };
}
