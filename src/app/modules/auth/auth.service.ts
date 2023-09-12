import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, interval, Observable, of, Subject, throwError } from 'rxjs'
import { catchError, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators'
import { UserInterface } from '../../models/user.model'
import { runOutsideNgZoneUtil } from '../../utils/run-outside-ng-zone.util'
import { LocalStorageService } from '../../services/local-storage.service'
import { decodeB64Util } from '../../utils/decode-b64.util'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public readonly USER_AUTH_API_URL = 'http://localhost:3000/auth'
  private readonly TOKEN_KEY = 'app-dashboard-token'
  private readonly _redirectToLogin$ = new Subject<void>()
  private readonly _token$ = new BehaviorSubject<string | null>(null)

  public constructor(
    private readonly http: HttpClient,
    private readonly ls: LocalStorageService
  ) {
    this._token$.next(this.ls.getItem(this.TOKEN_KEY) ?? null)
    this.refreshTokenByTimeout()
  }

  public get timeout(): number {
    return 1000 * 60 * 5
  }

  public get token(): string | null {
    return this._token$.getValue()
  }

  public get user(): UserInterface | null {
    return decodeB64Util<UserInterface>(this.token)
  }

  public get token$(): Observable<string | null> {
    return this._token$.asObservable().pipe(distinctUntilChanged())
  }

  public get redirectToLogin$(): Observable<void> {
    return this._redirectToLogin$.asObservable()
  }

  public logout(): void {
    this.saveToken(null)
    this._redirectToLogin$.next()
  }

  public initialize(): Observable<boolean> {
    if (!this.token) {
      return of(true)
    }

    return this.refreshToken$().pipe(map(() => true))
  }

  private saveToken(token: string | null): void {
    this._token$.next(token)

    if (token) {
      this.ls.setItem(this.TOKEN_KEY, token)
      return
    }

    this.ls.removeItem(this.TOKEN_KEY)
  }

  private refreshTokenByTimeout(): void {
    interval(this.timeout)
      .pipe(
        filter(() => isNotEmptyStringUtil(this.token)),
        switchMap(() => this.refreshToken$()),
        runOutsideNgZoneUtil()
      )
      .subscribe()
  }

  public login$(username: string, password: string): Observable<string | null> {
    return this.http.post<string>(this.USER_AUTH_API_URL + '/login', { username, password }, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('AuthService: login failed', error)
        return throwError(error)
      }),
      map(token => {
        this.saveToken(token)
        return token
      })
    )
  }

  private refreshToken$(): Observable<boolean> {
    return this.http.post<string>(this.USER_AUTH_API_URL + '/refresh', null, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('AuthService: token refresh failed', error)
        this.logout()
        return of(null)
      }),
      map(token => {
        this.saveToken(token)
        return !!token
      })
    )
  }
}
