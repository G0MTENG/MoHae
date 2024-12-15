interface User {
  id: number
  username: string
  randomCode: string
  avatar?: string
}

export type FetchUserInfoResponse = User
