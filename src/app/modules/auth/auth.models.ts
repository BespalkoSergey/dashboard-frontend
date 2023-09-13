export interface AuthErrorMsgInterface {
  authErrorMsg: string | null
}

export interface AuthTokenInterface {
  authToken: string | null
  authTokenMetaData: AuthTokenMetaDataInterface | null
}

export interface AuthTokenMetaDataInterface {
  id: number
  iat: number
  exp: number
}
export interface AuthProcessInterface {
  isAuthInProcess: boolean
  isAuthLoaded: boolean
}

export interface AuthLoginInterface {
  username: string
  password: string
}

export type AuthStoreStateType = AuthProcessInterface & AuthTokenInterface & AuthErrorMsgInterface
