export interface AuthDataInterface {
  token: string
}
export interface AuthStoreStateInterface {
  isAuthInProcess: boolean
  isAuthLoaded: boolean
  authErrorMsg: string | null
  authData: AuthDataInterface | null
}
