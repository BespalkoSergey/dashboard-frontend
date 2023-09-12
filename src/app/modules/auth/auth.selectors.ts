import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AUTH_FEATURE_NAME } from './auth.constants'
import { AuthStoreStateInterface } from './auth.models'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'

const getFeature = createFeatureSelector<AuthStoreStateInterface>(AUTH_FEATURE_NAME)

export const getIsAuthInProcess = createSelector(getFeature, state => state.isAuthInProcess)
export const getIsAuthLoaded = createSelector(getFeature, state => state.isAuthLoaded)
export const getAuthErrorMsg = createSelector(getFeature, state => state.authErrorMsg)
export const getAuthData = createSelector(getFeature, state => state.authData)
export const getToken = createSelector(getAuthData, authData => authData?.token)
export const getIsAuth = createSelector(getToken, token => isNotEmptyStringUtil(token))
