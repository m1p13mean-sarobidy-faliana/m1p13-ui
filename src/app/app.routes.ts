import {
  ConfirmPassword,
  Login,
  NotFound,
  VerifyEmail,
} from '@/app/pages';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'password/:token', component: ConfirmPassword},
  {path: 'verify-email/:token', component: VerifyEmail},
  {path: '**', component: NotFound},
];
