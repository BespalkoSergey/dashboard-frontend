import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TOKEN_KEY } from '../constants/constants'
import { LocalStorageService } from '../services/local-storage.service'
import { isNotEmptyStringUtil } from '../utils/in-not-empty-string.util'
import { LocationService } from '../services/location.service'

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {
  public constructor(
    private readonly ls: LocalStorageService,
    private readonly loc: LocationService
  ) {}
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.getReq(req))
  }

  private getReq(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.ls.getItem(TOKEN_KEY)

    if (isNotEmptyStringUtil(token) && this.loc.apiOrigin.includes(new URL(req.url).origin)) {
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return req
  }
}
