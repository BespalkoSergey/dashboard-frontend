import { ThemePalette } from '@angular/material/core'

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
