import { NgModule } from '@angular/core'
import { AuthComponent } from './auth.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AnimatedBtnComponent } from '../../ui/animated-btn/animated-btn.component'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { StoreModule } from '@ngrx/store'
import { authReducer } from './auth.reducer'
import { AUTH_FEATURE_NAME } from './auth.constants'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import * as authEffects from './auth.effects'
import { JwtModule } from '@auth0/angular-jwt'

@NgModule({
  declarations: [AuthComponent],
  imports: [
    EffectsModule.forFeature(authEffects),
    StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer),
    ReactiveFormsModule,
    AnimatedBtnComponent,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => null
      }
    })
  ]
})
export class AuthModule {}
