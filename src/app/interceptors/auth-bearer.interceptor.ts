import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { AuthService } from '../modules/auth/auth.service'

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {
  public constructor(private auth: AuthService) {}
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.getReq(req)).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.auth.logout()
        }
        return throwError(err)
      })
    )
  }

  private getReq(req: HttpRequest<unknown>): HttpRequest<unknown> {
    if (this.auth.token && this.auth.USER_AUTH_API_URL.includes(new URL(req.url).origin)) {
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.auth.token}`)
      })
    }

    return req
  }
}
