export interface RegisterRequest {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  birthday: string;
  gender: number;
  role: number;
}

export interface RegisterResponse {
  token: string;
  message: string;
}
