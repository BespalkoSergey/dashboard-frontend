import { CanMatchFn } from '@angular/router'
import { inject } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getIsAuth } from '../modules/auth/auth.selectors'

export const canMatchDashboardGuard: CanMatchFn = () => inject(Store).pipe(select(getIsAuth))
