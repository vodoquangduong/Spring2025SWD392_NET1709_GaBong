export interface Project {
  id: string;
  title: string;
  description: string;
  type: "fixed" | "hourly";
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: {
    value: number;
    unit: "days" | "weeks" | "months";
  };
  skills: string[];
  status: "open" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    name: string;
    avatar: string;
  };
  freelancer?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface ProjectDetail extends Project {
  requirements: string;
  attachments: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  proposals: {
    id: string;
    freelancer: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      completedProjects: number;
    };
    coverLetter: string;
    price: {
      amount: number;
      currency: string;
    };
    duration: {
      value: number;
      unit: "days" | "weeks" | "months";
    };
    status: "pending" | "accepted" | "rejected";
    createdAt: string;
  }[];
  milestones?: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    amount: number;
    status: "pending" | "in_progress" | "completed" | "cancelled";
    deliverables?: {
      id: string;
      title: string;
      description: string;
      attachments: {
        id: string;
        name: string;
        url: string;
        type: string;
      }[];
    }[];
  }[];
  timeline: {
    id: string;
    action: string;
    description: string;
    performedBy: {
      id: string;
      name: string;
      avatar: string;
      role: "client" | "freelancer" | "admin";
    };
    timestamp: string;
  }[];
  messages: {
    id: string;
    content: string;
    attachments?: {
      id: string;
      name: string;
      url: string;
      type: string;
    }[];
    sender: {
      id: string;
      name: string;
      avatar: string;
      role: "client" | "freelancer" | "admin";
    };
    createdAt: string;
  }[];
}

export interface PendingService {
  id: string;
  title: string;
  description: string;
  freelancer: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  submittedAt: string;
  waitingTime: string;
  status: string;
}
