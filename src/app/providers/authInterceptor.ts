import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthProvider} from './auth-provider';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = inject(AuthProvider).getToken();

  if (authToken) {
    const newReq = request.clone({
      headers: request.headers.set('Authorisation', `Bearer ${authToken}`),
    });
    return next(newReq);
  }
  return next(request);
}
