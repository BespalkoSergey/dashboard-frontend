import { createReducer } from '@ngrx/store'
import { INITIAL_AUTH_STORE_STATE } from './auth.constants'

export const authReducer = createReducer(INITIAL_AUTH_STORE_STATE)
