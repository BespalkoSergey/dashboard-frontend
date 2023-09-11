import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { UserAuthService } from '../services/user-auth.service'

export const canActivateAuthGuard: CanActivateFn = () => {
  const router = inject(Router)
  const auth = inject(UserAuthService)

  if (auth.token) {
    return router.navigate(['/dashboard'])
  }

  return true
}
