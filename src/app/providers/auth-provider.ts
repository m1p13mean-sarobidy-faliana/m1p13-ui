import {inject, Injectable, signal} from '@angular/core';
import {SecurityService} from '@m1p13/client';

@Injectable({
  providedIn: 'root',
})
export class AuthProvider {
  private service = inject(SecurityService);
  private _token = signal<string | null>(localStorage.getItem('jwt_token'));
  token = this._token.asReadonly();

  setToken(token: string) {
    localStorage.setItem('jwt_token', token);
    this._token.set(token);
  }

  getToken() {
    return this.token();
  }
}
