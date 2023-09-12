import { Component } from '@angular/core'
import { AuthService } from './modules/auth/auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `<router-outlet />`
})
export class AppComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.auth.redirectToLogin$.pipe(takeUntilDestroyed()).subscribe(() => this.router.navigate(['/auth']))
  }
}
