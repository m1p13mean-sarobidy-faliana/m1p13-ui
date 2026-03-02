import {Screen} from '@/app/utils/screen';
import {SidebarService} from '@/app/utils/sidebar';
import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';

@Component({
  selector: 'navbar',
  imports: [ButtonModule, ToolbarModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  sidebarService = inject(SidebarService);
  screen = inject(Screen);
}
