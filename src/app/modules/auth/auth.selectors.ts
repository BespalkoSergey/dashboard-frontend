import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AUTH_FEATURE_NAME } from './auth.constants'
import { AuthStoreStateType } from './auth.models'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'

const getFeature = createFeatureSelector<AuthStoreStateType>(AUTH_FEATURE_NAME)

export const getIsAuthInProcess = createSelector(getFeature, ({ isAuthInProcess }) => isAuthInProcess)
export const getIsAuthLoaded = createSelector(getFeature, ({ isAuthLoaded }) => isAuthLoaded)
export const getAuthErrorMsg = createSelector(getFeature, ({ authErrorMsg }) => authErrorMsg)
export const getAuthToken = createSelector(getFeature, ({ authToken }) => authToken)
export const getIsAuth = createSelector(getAuthToken, token => isNotEmptyStringUtil(token))
