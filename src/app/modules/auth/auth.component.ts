import { Component, computed, inject, signal } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { combineLatest, startWith, Subject } from 'rxjs'
import { AUTH_FEATURE_NAME, ICON_COLOR_MAP, InputTypeEnum, VisibilityEnum } from './auth.constants'
import { toSignal } from '@angular/core/rxjs-interop'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'
import { select, Store } from '@ngrx/store'
import { getAuthErrorMsg, getIsAuthInProcess } from './auth.selectors'

@Component({
  selector: AUTH_FEATURE_NAME,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private readonly store$ = inject(Store)
  private readonly isPassTouched$ = new Subject<boolean>()
  public readonly password = new FormControl('', [Validators.required])

  private readonly isPassHiddenSignal = signal(true)
  private readonly inputTypeSignal = computed(() => (this.isPassHidden ? InputTypeEnum.password : InputTypeEnum.text))
  private readonly visibilitySignal = computed(() => (this.isPassHidden ? VisibilityEnum.visibility_off : VisibilityEnum.visibility))
  private readonly iconColorSignal = toSignal(
    combineLatest([this.password.valueChanges.pipe(startWith(null)), this.isPassTouched$.pipe(startWith(null))]).pipe(
      map(() => this.password.touched && this.password.invalid),
      distinctUntilChanged(),
      map(invalid => (invalid ? ICON_COLOR_MAP.red : ICON_COLOR_MAP.grey))
    )
  )
  private readonly isAuthInProcessSignal = toSignal(this.store$.pipe(select(getIsAuthInProcess)))
  private readonly authErrorMsgSignal = toSignal(this.store$.pipe(select(getAuthErrorMsg)))

  public togglePassVisibility(): void {
    this.isPassHiddenSignal.set(!this.isPassHidden)
  }

  public setIsPassTouched(): void {
    this.isPassTouched$.next(true)
  }

  public onClick(e: MouseEvent) {
    e.stopPropagation()
    e.preventDefault()

    this.password.markAsTouched()
    this.password.markAsDirty()
    this.isPassTouched$.next(true)

    const { value } = this.password

    if (this.password.invalid || !isNotEmptyStringUtil(value) || this.isAuthInProcess) {
      return
    }

    console.log(value)
  }

  public get isAuthInProcess(): boolean {
    return this.isAuthInProcessSignal() ?? false
  }

  public get authErrorMsg(): string {
    return this.authErrorMsgSignal() ?? ''
  }

  public get iconColor(): ThemePalette {
    return this.iconColorSignal()
  }

  public get visibility(): VisibilityEnum {
    return this.visibilitySignal()
  }

  public get inputType(): InputTypeEnum {
    return this.inputTypeSignal()
  }

  public get isPassHidden(): boolean {
    return this.isPassHiddenSignal()
  }
}
