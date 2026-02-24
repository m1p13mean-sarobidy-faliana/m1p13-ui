import {Login, LoginMfa, NotFound} from '@/app/pages';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'login-mfa', component: LoginMfa},
  {path: '**', component: NotFound},
];
