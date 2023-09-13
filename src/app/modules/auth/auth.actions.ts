import { createAction, props } from '@ngrx/store'
import { AuthLoginInterface, AuthErrorMsgInterface, AuthTokenInterface } from './auth.models'

export const authInProcess = createAction('[AUTH] authentication is in process', props<AuthLoginInterface>())
export const authSuccess = createAction('[AUTH] authentication is success', props<AuthTokenInterface>())
export const authFailed = createAction('[AUTH] authentication is failed', props<AuthErrorMsgInterface>())
