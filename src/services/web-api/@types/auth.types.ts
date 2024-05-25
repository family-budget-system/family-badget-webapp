
export type LoginPayload = {
  email: string
  password: string
}

export type AuthorizationResponse = {
  id: number
  email: string
  token: string
}

export type UserInfoResponse = {
  id: number
  email: string
}