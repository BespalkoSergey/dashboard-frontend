export interface AuthErrorMsgInterface {
  authErrorMsg: string | null
}

export interface AuthTokenInterface {
  authToken: string | null
}
export interface AuthProcessInterface {
  isAuthInProcess: boolean
  isAuthLoaded: boolean
}

export interface AuthAdminLoginInterface {
  username: string
  password: string
}

export type AuthStoreStateType = AuthProcessInterface & AuthTokenInterface & AuthErrorMsgInterface
