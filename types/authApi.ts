export interface UserRegistrationPayload{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}


export interface UserLoginPayload{
    email: string;
    password: string;
}

export interface ChangePasswordPayload{
    oldPassword: string;
    newPassword: string;
}

export interface ForgotPasswordPayload{
    email: string;
}


export interface ResetPasswordPayload{
    newpassword: string;
    token: string;
}


export interface RefreshTokenPayload{
    accessToken: string;
}

export interface AuthState {
    user: {
      username?: string
      email?: string
      role?: string
    } | null
    accessToken: string | null
    isAuthenticated: boolean
  }
  