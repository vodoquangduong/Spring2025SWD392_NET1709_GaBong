export interface Report {
  id: string;
  title: string;
  type: "service" | "user" | "payment" | "other";
  priority: "high" | "medium" | "low";
  status: "pending" | "investigating" | "resolved" | "rejected";
  reportedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  reportedItem: {
    id: string;
    name: string;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReportDetail extends Report {
  description: string;
  attachments: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  timeline: {
    id: string;
    action: string;
    note: string;
    performedBy: {
      id: string;
      name: string;
      avatar: string;
    };
    timestamp: string;
  }[];
  comments: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  }[];
  resolution?: {
    action: string;
    reason: string;
    resolvedBy: {
      id: string;
      name: string;
      avatar: string;
    };
    resolvedAt: string;
  };
}
