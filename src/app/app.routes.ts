import {
  AdminDashboard,
  Cart,
  Catalog,
  ConfirmPassword,
  Login,
  NotFound,
  Profile,
  Register,
  Shop,
  ShopList,
  VerifyEmail,
} from '@/app/pages';
import {Routes} from '@angular/router';
import {Layout} from './components';
import {AuthGuardService} from './utils/auth-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'catalogs', pathMatch: 'full'},
  {
    path: '',
    component: Layout,
    children: [
      {path: 'cart', component: Cart},
      {path: 'catalogs', component: Catalog},
      {path: 'shops', component: ShopList},
      {path: 'shops/:shopId', component: Shop},
      {path: 'profile', component: Profile},
      {
        path: 'dashboard',
        component: AdminDashboard,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {path: 'login', component: Login},
  {path: 'password/:token', component: ConfirmPassword},
  {path: 'verify-email/:token', component: VerifyEmail},
  {path: 'register', component: Register},
  {path: '**', component: NotFound},
];
