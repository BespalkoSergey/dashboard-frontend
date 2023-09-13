import { createAction, props } from '@ngrx/store'
import { AuthAdminLoginInterface, AuthErrorMsgInterface, AuthTokenInterface } from './auth.models'

export const authInProcess = createAction('[AUTH] authentication is in process', props<AuthAdminLoginInterface>())
export const authSuccess = createAction('[AUTH] authentication is success', props<AuthTokenInterface>())
export const authFailed = createAction('[AUTH] authentication is failed', props<AuthErrorMsgInterface>())
