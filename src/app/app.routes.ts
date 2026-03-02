import {
  AdminDashboard,
  Catalog,
  ConfirmPassword,
  Login,
  NotFound,
  Register,
  Shop,
  VerifyEmail,
} from '@/app/pages';
import {Routes} from '@angular/router';
import {Layout} from './components';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {path: 'catalogs', component: Catalog},
      {path: 'shops/:shopId', component: Shop},
      {
        path: 'dashboard',
        component: AdminDashboard,
      },
    ],
  },
  {path: 'login', component: Login},
  {path: 'password/:token', component: ConfirmPassword},
  {path: 'verify-email/:token', component: VerifyEmail},
  {path: 'register', component: Register},
  {path: '**', component: NotFound},
];
