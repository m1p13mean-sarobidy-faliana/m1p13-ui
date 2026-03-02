import {AuthProvider} from '@/app/providers/auth-provider';
import {Screen} from '@/app/utils/screen';
import {SidebarService} from '@/app/utils/sidebar';
import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {DrawerModule} from 'primeng/drawer';

@Component({
  selector: 'sidebar',
  imports: [AvatarModule, DrawerModule, ButtonModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private router = inject(Router);
  screen = inject(Screen);
  sidebarService = inject(SidebarService);
  authProvider = inject(AuthProvider);
  readonly loggedUser = computed(() => this.authProvider.currentUser());
  readonly currentUrl = computed(() => this.router.url);

  possibleRoutes = [
    {
      url: '/dashboard',
      label: 'Tableau de bord',
      authorized: this.authProvider.isAdmin(),
      icon: 'pi pi-clipboard',
    },
    {
      url: '/catalogs',
      label: 'Catalogue',
      authorized: true,
      icon: 'pi pi-objects-column',
    },
    {
      url: '/shops',
      label: 'Boutique',
      authorized: true,
      icon: 'pi pi-shop',
    },
    {
      url: '/cart',
      label: 'Panier',
      authorized: true,
      icon: 'pi pi-shopping-cart',
    },
  ];

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
