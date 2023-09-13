import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { AuthService } from './auth.service'
import { authFailed, authInProcess, authSuccess } from './auth.actions'
import { switchMap, of, tap, timer, withLatestFrom, catchError, filter, map } from 'rxjs'
import { Router } from '@angular/router'
import { ONE_MINUTE_IN_MS } from './auth.constants'
import { getErrorMsgUtil } from '../../utils/get-error-msg.util'
import { LocalStorageService } from '../../services/local-storage.service'
import { AUTH_ROUTE_NAME, DASHBOARD_ROUTE_NAME, TOKEN_KEY } from '../../constants/constants'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'
import { routerNavigatedAction } from '@ngrx/router-store'
import { Store } from '@ngrx/store'

export const successLogin = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService)) =>
    actions$.pipe(
      ofType(authInProcess),
      switchMap(({ type, ...body }) => auth.login$(body)),
      map(v => authSuccess({ ...v })),
      catchError(e => {
        console.error('loginEffect: login failed', e)
        return of(authFailed({ authErrorMsg: getErrorMsgUtil(e) }))
      })
    ),
  { functional: true }
)

export const refreshToken = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService), ls = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(authSuccess),
      tap(({ authToken }) => {
        if (isNotEmptyStringUtil(authToken)) {
          ls.setItem(TOKEN_KEY, authToken)
        }
      }),
      map(v => v.authTokenMetaData?.exp),
      filter((c: unknown): c is number => typeof c === 'number' && c > 0),
      map(exp => {
        const tokenExpireInMS = exp * 1000
        const diff = tokenExpireInMS - Date.now()
        return diff - ONE_MINUTE_IN_MS
      }),
      switchMap(exp => timer(exp)),
      switchMap(() => auth.refreshToken$()),
      map(v => authSuccess({ ...v })),
      catchError(e => {
        console.error('refreshTokenEffect: refresh token failed', e)
        return of(authFailed({ authErrorMsg: getErrorMsgUtil(e) }))
      })
    ),
  { functional: true }
)

export const initRedirect = createEffect(
  (actions$ = inject(Actions), ls = inject(LocalStorageService), router = inject(Router), store$ = inject(Store)) =>
    actions$.pipe(
      ofType(authSuccess),
      filter(({ authToken }) => isNotEmptyStringUtil(authToken)),
      withLatestFrom(actions$.pipe(ofType(routerNavigatedAction))),
      tap(
        ([
          _,
          {
            payload: {
              routerState: { url }
            }
          }
        ]) => {
          if (url.includes(AUTH_ROUTE_NAME)) {
            router.navigate([DASHBOARD_ROUTE_NAME])
          }
        }
      )
    ),
  { functional: true, dispatch: false }
)

export const failedLogin = createEffect(
  (actions$ = inject(Actions), ls = inject(LocalStorageService), router = inject(Router)) =>
    actions$.pipe(
      ofType(authFailed),
      withLatestFrom(actions$.pipe(ofType(routerNavigatedAction))),
      tap(([_, { payload }]) => {
        ls.removeItem(TOKEN_KEY)
        if (!payload.routerState.url.includes(AUTH_ROUTE_NAME)) {
          router.navigate([AUTH_ROUTE_NAME])
        }
      })
    ),
  { functional: true, dispatch: false }
)
