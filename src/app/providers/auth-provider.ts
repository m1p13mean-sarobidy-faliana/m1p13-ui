import {computed, inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {User, UserRole} from '@m1p13mean-sarobidy-faliana/client';

const {Customer, Admin, ShopManager} = UserRole;
@Injectable({
  providedIn: 'root',
})
export class AuthProvider {
  private router = inject(Router);
  private savedUser = localStorage.getItem('current_user');
  private _currentUser = signal<User | null>(
    this.savedUser ? JSON.parse(this.savedUser) : null
  );
  private _token = signal<string | null>(localStorage.getItem('jwt_token'));
  token = this._token.asReadonly();
  currentUser = this._currentUser.asReadonly();

  isLoggedIn = computed(() => this.currentUser() && this.token());
  isCustomer = computed(() => this.currentUser()?.role == 'CUSTOMER');
  isAdmin = computed(() => this.currentUser()?.role == 'ADMIN');
  isShopAdmin = computed(() => this.currentUser()?.role == 'SHOP_MANAGER');

  labeledRole = {
    [Customer]: 'Client',
    [Admin]: 'Super Administrateur',
    [ShopManager]: 'Admin boutique',
  };

  getLabeledRole() {
    return this.labeledRole[this.currentUser()?.role!];
  }

  setUser(user: User) {
    this._currentUser.set(user);
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  setToken(token: string) {
    localStorage.setItem('jwt_token', token);
    this._token.set(token);
  }

  getToken() {
    return this.token();
  }
  logout() {
    localStorage.clear();
    this._currentUser.set(null);
    this._token.set(null);
    this.router.navigate(['/login']);
  }
}
