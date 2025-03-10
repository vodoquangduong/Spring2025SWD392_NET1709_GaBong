export interface Account {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: "admin" | "staff" | "client";
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
}

export interface AccountDetail {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
  role: "admin" | "staff" | "client";
  status: "active" | "inactive" | "suspended";
  permissions: {
    module: string;
    actions: string[];
  }[];
  activityLog: {
    action: string;
    timestamp: string;
    ipAddress: string;
    details: string;
  }[];
  securitySettings: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    passwordExpiryDate: string;
  };
  notifications: {
    email: boolean;
    desktop: boolean;
    mobile: boolean;
  };
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}
