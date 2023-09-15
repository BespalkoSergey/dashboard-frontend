import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { AuthLoginInterface, AuthTokenInterface, AuthTokenMetaDataInterface } from './auth.models'
import { JwtHelperService } from '@auth0/angular-jwt'
import { LocationService } from '../../services/location.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public constructor(
    private readonly http: HttpClient,
    private readonly jwt: JwtHelperService,
    private readonly loc: LocationService
  ) {}
  public login$(body: AuthLoginInterface): Observable<AuthTokenInterface> {
    return this.http.post<string>(this.loc.apiOrigin + '/auth/login', body, { responseType: 'text' as 'json' }).pipe(map(str => this.getAuthTokenData(str)))
  }

  public refreshToken$(): Observable<AuthTokenInterface> {
    return this.http.post<string>(this.loc.apiOrigin + '/auth/refresh', null, { responseType: 'text' as 'json' }).pipe(map(str => this.getAuthTokenData(str)))
  }

  private getAuthTokenData(str: string) {
    const token = this.jwt.decodeToken<AuthTokenMetaDataInterface>(str)

    if (!token) {
      throw new Error('Token is empty')
    }

    return { authToken: str, authTokenMetaData: { ...token } }
  }
}
