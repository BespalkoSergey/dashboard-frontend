import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { isNotEmptyStringUtil } from '../../utils/in-not-empty-string.util'
import { AuthLoginInterface, AuthTokenInterface, AuthTokenMetaDataInterface } from './auth.models'
import { JwtHelperService } from '@auth0/angular-jwt'
import { USER_AUTH_API_URL } from '../../constants/constants'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public constructor(
    private readonly http: HttpClient,
    private readonly jwt: JwtHelperService
  ) {}
  public login$(body: AuthLoginInterface): Observable<AuthTokenInterface> {
    return this.http.post<string>(USER_AUTH_API_URL + '/login', body, { responseType: 'text' as 'json' }).pipe(map(str => this.getAuthTokenData(str)))
  }

  public refreshToken$(): Observable<AuthTokenInterface> {
    return this.http.post<string>(USER_AUTH_API_URL + '/refresh', null, { responseType: 'text' as 'json' }).pipe(map(str => this.getAuthTokenData(str)))
  }

  private getAuthTokenData(str: string) {
    if (!isNotEmptyStringUtil(str)) {
      return { authToken: null, authTokenMetaData: null }
    }

    const token = this.jwt.decodeToken<AuthTokenMetaDataInterface>(str)
    if (!token) {
      return { authToken: null, authTokenMetaData: null }
    }

    return { authToken: str, authTokenMetaData: { ...token } }
  }
}
