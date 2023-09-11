import { MonoTypeOperatorFunction, Observable } from 'rxjs'
import { inject } from '@angular/core'
import { NgZone } from '@angular/core'

export const runOutsideNgZoneUtil = <T>(): MonoTypeOperatorFunction<T> => {
  const ngZone = inject(NgZone)
  return (source: Observable<T>): Observable<T> =>
    new Observable<T>(observer =>
      ngZone.runOutsideAngular(() =>
        source.subscribe(
          (value: T) => observer.next(value),
          (error: unknown) => observer.error(error),
          () => observer.complete()
        )
      )
    )
}
