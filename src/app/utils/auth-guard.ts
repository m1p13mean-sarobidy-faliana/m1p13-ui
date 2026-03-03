import {AuthProvider} from '@/app/providers/auth-provider';
import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private authProvider = inject(AuthProvider);
  private router = inject(Router);
  private toast = inject(ToastrService);

  canActivate(): boolean {
    if (!this.authProvider.isLoggedIn()) {
      this.router.navigate(['/catalogs']);
      this.toast.info('Connecté vous pour plus de  libérté');
      return false;
    }

    return true;
  }
}
