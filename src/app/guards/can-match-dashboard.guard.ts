import { CanMatchFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { UserAuthService } from '../services/user-auth.service'

export const canMatchDashboardGuard: CanMatchFn = () => {
  const router = inject(Router)
  const auth = inject(UserAuthService)

  if (!auth.token) {
    auth.logout()
    return router.navigate(['/auth'])
  }

  return true
}
