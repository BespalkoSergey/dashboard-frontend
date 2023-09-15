import { createReducer, on } from '@ngrx/store'
import { INITIAL_AUTH_STORE_STATE } from './auth.constants'
import { authFailed, authInProcess, authSuccess } from './auth.actions'

export const authReducer = createReducer(
  INITIAL_AUTH_STORE_STATE,
  on(authInProcess, state => ({ ...state, isAuthInProcess: true, isAuthLoaded: false, authErrorMsg: null, authToken: null })),
  on(authSuccess, (state, { authToken }) => ({ ...state, isAuthInProcess: false, isAuthLoaded: true, authErrorMsg: null, authToken })),
  on(authFailed, (state, { authErrorMsg }) => ({ ...state, isAuthInProcess: false, isAuthLoaded: false, authErrorMsg, authToken: null }))
)
