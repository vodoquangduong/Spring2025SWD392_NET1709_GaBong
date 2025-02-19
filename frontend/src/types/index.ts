import { ReactNode } from "react";

export enum Role {
  ADMIN = "Admin",
  STAFF = "Staff",
  CLIENT = "Client",
  FREELANCER = "Freelancer",
  GUEST = "Guest",
}

export type User = {
  id: number;
  email: string;
  password?: string;
  name: string;
  dob: string;
  avatar?: string;
  description?: string;
  address?: string;
  phone?: string;
  school?: string;
  major?: string;
  degree?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type FormCallback = {
  (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>): ReactNode;
};

export enum ProjectStatus {
  IN_PROGRESS = "0",
  OPEN = "1",
  COMPLETED = "2",
  CANCELLED = "3",
}
