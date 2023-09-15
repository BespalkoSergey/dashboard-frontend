import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TOKEN_KEY, USER_AUTH_API_URL } from '../constants/constants'
import { LocalStorageService } from '../services/local-storage.service'
import { isNotEmptyStringUtil } from '../utils/in-not-empty-string.util'

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {
  public constructor(private readonly ls: LocalStorageService) {}
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.getReq(req))
  }

  private getReq(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.ls.getItem(TOKEN_KEY)

    if (isNotEmptyStringUtil(token) && USER_AUTH_API_URL.includes(new URL(req.url).origin)) {
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return req
  }
}
