import { Component, computed, signal } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { combineLatest, startWith, Subject } from 'rxjs'
import { ICON_COLOR_MAP, InputTypeEnum, VisibilityEnum } from './auth.constants'
import { toSignal } from '@angular/core/rxjs-interop'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public readonly password = new FormControl('', [Validators.required])
  private readonly isPassTouched$ = new Subject<boolean>()

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

    if (this.password.invalid) {
      return
    }

    const value = this.password.value

    console.log(value)
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
