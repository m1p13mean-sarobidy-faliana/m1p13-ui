import {Login, NotFound} from '@/app/pages';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: '**', component: NotFound},
];
