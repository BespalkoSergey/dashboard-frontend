import { CanMatchFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { UserService } from '../services/user.service'

export const canMatchDashboardGuard: CanMatchFn = () => {
  const user = inject(UserService)
  const router = inject(Router)

  if (!user.isLoggedIn) {
    return router.navigate(['/auth'])
  }

  return true
}
