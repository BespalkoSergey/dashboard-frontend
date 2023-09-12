import { ThemePalette } from '@angular/material/core'
import { AuthStoreStateInterface } from './auth.models'

export const AUTH_FEATURE_NAME = 'app-auth'
export const INITIAL_AUTH_STORE_STATE: AuthStoreStateInterface = {
  isAuthInProcess: false,
  isAuthLoaded: false,
  authErrorMsg: null,
  authData: null
}

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
