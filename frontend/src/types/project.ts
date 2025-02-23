export interface Project {
  projectId: string;
  projectName: string;
  clientId: string;
  title: string;
  postDate: string;
  projectDescription: string;
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
  status: ProjectStatus;
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

export enum ProjectStatus {
  PENDING = 0,
  OPEN = 1,
  COMPLETED = 2,
  CANCELLED = 3,
}
