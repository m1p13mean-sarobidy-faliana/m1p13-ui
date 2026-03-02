import {AuthProvider} from '@/app/providers/auth-provider';
import {Screen} from '@/app/utils/screen';
import {SidebarService} from '@/app/utils/sidebar';
import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {DrawerModule} from 'primeng/drawer';
import {SidebarContent} from './sidebar-content';

@Component({
  selector: 'sidebar',
  imports: [AvatarModule, DrawerModule, ButtonModule, SidebarContent],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private router = inject(Router);
  screen = inject(Screen);
  sidebarService = inject(SidebarService);
  authProvider = inject(AuthProvider);
  readonly loggedUser = computed(() => this.authProvider.currentUser());
  readonly currentUrl = computed(() => this.router.url);

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
