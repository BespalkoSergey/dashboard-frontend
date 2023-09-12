import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../modules/auth/auth.service'

export const canActivateAuthGuard: CanActivateFn = () => {
  const router = inject(Router)
  const auth = inject(AuthService)

  if (auth.token) {
    return router.navigate(['/dashboard'])
  }

  return true
}
