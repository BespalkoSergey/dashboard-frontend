import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class UserService {
  public get isLoggedIn(): boolean {
    return false
  }
}
