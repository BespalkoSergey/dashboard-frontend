import { Component, computed, HostListener, inject, signal } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BehaviorSubject, combineLatest, startWith } from 'rxjs'
import { AUTH_FEATURE_NAME, AUTH_USER_NAME, ICON_COLOR_MAP, InputTypeEnum, PASS_ERROR_REQUIRED_MSG, VisibilityEnum } from './auth.constants'
import { toSignal } from '@angular/core/rxjs-interop'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'
import { select, Store } from '@ngrx/store'
import { getAuthErrorMsg, getIsAuthInProcess } from './auth.selectors'
import { authInProcess } from './auth.actions'

@Component({
  selector: AUTH_FEATURE_NAME,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private readonly store$ = inject(Store)
  private readonly isPassTouched$ = new BehaviorSubject<boolean>(false)
  private readonly sentPass$ = new BehaviorSubject<string | null>(null)
  public readonly password = new FormControl('')

  private readonly isPassHiddenSignal = signal(true)
  private readonly inputTypeSignal = computed(() => (this.isPassHidden ? InputTypeEnum.password : InputTypeEnum.text))
  private readonly visibilitySignal = computed(() => (this.isPassHidden ? VisibilityEnum.visibility_off : VisibilityEnum.visibility))
  private readonly iconColorSignal = computed(() => (this.isPassInvalid ? ICON_COLOR_MAP.red : ICON_COLOR_MAP.grey))
  private readonly isAuthInProcessSignal = toSignal(this.store$.pipe(select(getIsAuthInProcess)))
  private readonly isPassInvalidSignal = toSignal(
    combineLatest([this.sentPass$, this.store$.pipe(select(getAuthErrorMsg)), this.password.valueChanges.pipe(startWith(null)), this.isPassTouched$]).pipe(
      map(([sentPass, message]) => {
        const pass = this.password
        const isEmpty = !isNotEmptyStringUtil(pass.value)

        pass.setErrors(null)

        if (isEmpty) {
          pass.setErrors({ message: PASS_ERROR_REQUIRED_MSG })
        }

        if (!isEmpty && !!message && pass.value === sentPass) {
          pass.setErrors({ message })
        }

        return pass.touched && pass.invalid
      }),
      distinctUntilChanged()
    )
  )

  public togglePassVisibility(): void {
    this.isPassHiddenSignal.set(!this.isPassHidden)
  }

  public setIsPassTouched(): void {
    this.isPassTouched$.next(true)
  }

  @HostListener('document:keydown.enter', ['$event'])
  public submit(e: UIEvent): void {
    e.stopPropagation()
    e.preventDefault()

    this.password.markAsTouched()
    this.password.markAsDirty()
    this.isPassTouched$.next(true)

    const { value } = this.password

    if (this.isPassInvalid || this.isAuthInProcess || !isNotEmptyStringUtil(value)) {
      return
    }

    this.sentPass$.next(value)
    this.store$.dispatch(authInProcess({ username: AUTH_USER_NAME, password: value }))
  }

  public get isAuthInProcess(): boolean {
    return this.isAuthInProcessSignal() ?? false
  }

  public get isPassInvalid(): boolean {
    return this.isPassInvalidSignal() ?? false
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
