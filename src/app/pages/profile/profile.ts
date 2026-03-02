import {UserForm} from '@/app/components';
import {AuthProvider} from '@/app/providers/auth-provider';
import {Component, computed, inject, signal} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {ChipModule} from 'primeng/chip';
import {Dialog} from 'primeng/dialog';
import {TagModule} from 'primeng/tag';

export interface Order {
  id: string;
  date: string;
  name: string;
  amount: number;
  status: 'DELIVERED' | 'IN TRANSIT' | 'PROCESSING';
}

@Component({
  selector: 'profile',
  imports: [
    ButtonModule,
    ChipModule,
    TagModule,
    BadgeModule,
    AvatarModule,
    Dialog,
    UserForm,
  ],
  templateUrl: './profile.html',
})
export class Profile {
  authProvider = inject(AuthProvider);
  editUser = false;
  readonly loggedUser = computed(() => this.authProvider.currentUser());
  orders = signal<Order[]>([
    {
      id: '#SH-8241',
      date: 'Oct 12, 2023',
      name: 'Wireless Headphones + 2 items',
      amount: 199.0,
      status: 'DELIVERED',
    },
    {
      id: '#SH-8245',
      date: 'Oct 14, 2023',
      name: 'Athletic Shoes (1 item)',
      amount: 85.5,
      status: 'IN TRANSIT',
    },
    {
      id: '#SH-7920',
      date: 'Oct 16, 2023',
      name: 'Smart Watch (1 item)',
      amount: 249.0,
      status: 'PROCESSING',
    },
    {
      id: '#SH-7920',
      date: 'Oct 16, 2023',
      name: 'Smart Watch (1 item)',
      amount: 249.0,
      status: 'PROCESSING',
    },
    {
      id: '#SH-7920',
      date: 'Oct 16, 2023',
      name: 'Smart Watch (1 item)',
      amount: 249.0,
      status: 'PROCESSING',
    },
    {
      id: '#SH-7920',
      date: 'Oct 16, 2023',
      name: 'Smart Watch (1 item)',
      amount: 249.0,
      status: 'PROCESSING',
    },
    {
      id: '#SH-7920',
      date: 'Oct 16, 2023',
      name: 'Smart Watch (1 item)',
      amount: 249.0,
      status: 'PROCESSING',
    },
    {
      id: '#SH-7855',
      date: 'Sept 28, 2023',
      name: 'Home Office Bundle + 4 items',
      amount: 412.2,
      status: 'DELIVERED',
    },
  ]);
  showEditableUser() {
    this.editUser = true;
  }
}
