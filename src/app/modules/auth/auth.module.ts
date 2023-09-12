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

@NgModule({
  declarations: [AuthComponent],
  imports: [StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer), ReactiveFormsModule, AnimatedBtnComponent, MatIconModule, MatInputModule, MatButtonModule, CommonModule]
})
export class AuthModule {}
