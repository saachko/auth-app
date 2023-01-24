interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  registrationDate: string;
  lastLoginDate: string;
  isBlocked: boolean;
}

interface RegistrationUserData {
  username: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

interface AuthResponse {
  status: number;
  message: string;
}

export type { User, RegistrationUserData, LoginUserData, AuthResponse };
