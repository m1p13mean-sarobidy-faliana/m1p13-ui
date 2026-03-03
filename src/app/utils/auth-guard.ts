import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthProvider} from '../providers/auth-provider';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  router = inject(Router);
  authProvider = inject(AuthProvider);

  canActivate(): boolean {
    if (!this.authProvider.isLoggedIn() || !this.authProvider.isAdmin()) {
      this.router.navigate(['/catalogs']);
      return false;
    }

    return true;
  }
}
