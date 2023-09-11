import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthComponent } from './auth.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AnimatedBtnComponent } from '../../ui/animated-btn/animated-btn.component'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule.forChild([{ path: '', component: AuthComponent }]), ReactiveFormsModule, AnimatedBtnComponent, MatIconModule, MatInputModule, MatButtonModule]
})
export class AuthModule {}
