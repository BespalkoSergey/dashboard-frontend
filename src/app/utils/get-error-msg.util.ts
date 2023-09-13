import { HttpErrorResponse } from '@angular/common/http'
import { HTTP_ERROR_STATUS_CODE_MAP } from '../modules/auth/auth.constants'

export const getErrorMsgUtil = (e: unknown): string => {
  const isErrorInstanceofHttpErrorResponse = e instanceof HttpErrorResponse
  if (!isErrorInstanceofHttpErrorResponse) {
    return 'error is not instance of HttpErrorResponse'
  }

  return HTTP_ERROR_STATUS_CODE_MAP[e.status.toString()] ?? `unknown error status code ${e.status}`
}
