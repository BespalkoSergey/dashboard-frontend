import { ThemePalette } from '@angular/material/core'
import { AuthStoreStateType } from './auth.models'

export const AUTH_USER_NAME = 'admin'
export const AUTH_FEATURE_NAME = 'app-auth'
export const INITIAL_AUTH_STORE_STATE: AuthStoreStateType = {
  isAuthInProcess: false,
  isAuthLoaded: false,
  authErrorMsg: null,
  authToken: null
}

export const PASS_ERROR_REQUIRED_MSG = 'this field is required'

export enum InputTypeEnum {
  'password' = 'password',
  'text' = 'text'
}

export enum VisibilityEnum {
  'visibility_off' = 'visibility_off',
  'visibility' = 'visibility'
}
export const ICON_COLOR_MAP: Record<'blue' | 'pink' | 'red' | 'grey', ThemePalette> = {
  blue: 'primary',
  pink: 'accent',
  red: 'warn',
  grey: undefined
}

export const HTTP_ERROR_STATUS_CODE_MAP: Record<string, string> = {
  '401': 'Password is wrong. Try another!'
}
