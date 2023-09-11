import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { UserService } from '../services/user.service'

export const canActivateAuthGuard: CanActivateFn = () => {
  const user = inject(UserService)
  const router = inject(Router)

  if (user.isLoggedIn) {
    return router.navigate(['/dashboard'])
  }

  return true
}
