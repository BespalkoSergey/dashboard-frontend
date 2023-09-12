import { CanMatchFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../modules/auth/auth.service'

export const canMatchDashboardGuard: CanMatchFn = () => {
  const router = inject(Router)
  const auth = inject(AuthService)

  if (!auth.token) {
    auth.logout()
    return router.navigate(['/auth'])
  }

  return true
}
