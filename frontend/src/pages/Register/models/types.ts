export type Role = "client" | "freelancer";

export interface RegisterFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
  agreeToTerms: boolean;
}
