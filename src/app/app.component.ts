import { Component } from '@angular/core'
import { UserAuthService } from './services/user-auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `<router-outlet />`
})
export class AppComponent {
  constructor(
    private readonly auth: UserAuthService,
    private readonly router: Router
  ) {
    this.auth.redirectToLogin$.pipe(takeUntilDestroyed()).subscribe(() => this.router.navigate(['/auth']))
  }
}
