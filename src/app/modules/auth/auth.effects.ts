import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { AuthService } from './auth.service'
import { authFailed, authInProcess, authSuccess } from './auth.actions'
import { switchMap, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

export const login = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authInProcess),
      switchMap(({ type, ...body }) => auth.login$(body)),
      map(authToken => authSuccess({ authToken })),
      catchError(e => {
        console.error('loginEffect: login failed', e)
        return of(authFailed({ authErrorMsg: auth.getErrorMsg(e) }))
      })
    )
  },
  { functional: true }
)
