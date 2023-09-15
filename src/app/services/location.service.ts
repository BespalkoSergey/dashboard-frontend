import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { LOCALHOST_API_ORIGIN } from '../constants/constants'

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(@Inject(DOCUMENT) private readonly _document: Document) {}

  public get apiOrigin(): string {
    return this._document.defaultView?.location.origin ?? LOCALHOST_API_ORIGIN
  }
}
