import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { UserAuthService } from '../services/user-auth.service'

@Injectable()
export class AuthBearerService {
  public constructor(private auth: UserAuthService) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.token && this.auth.USER_AUTH_API_URL.includes(new URL(req.url).origin)) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.auth.token}`)
      })
    }
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.auth.logout()
        }
        return throwError(err)
      })
    )
  }
}
