export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: number;
}

export interface RegisterResponse {
  token: string;
  message: string;
}
