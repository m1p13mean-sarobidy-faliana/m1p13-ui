import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {AuthProvider} from './auth-provider';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const router = inject(Router);
  const authProvider = inject(AuthProvider);

  if (authProvider.getToken()) {
    const newReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${authProvider.getToken()!.accessToken}`
      ),
    });
    return next(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authProvider.logout();
        }

        return throwError(() => error);
      })
    );
  }
  return next(request);
}
