export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
  refreshToken: string
}

export interface SignUpRequest {
  email: string
  password: string
  username: string
}

export interface SignUpResponse {
  message: string
}

export interface RefreshRequest {
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
}
