import {Screen} from '@/app/utils/screen';
import {SidebarService} from '@/app/utils/sidebar';
import {Component, inject} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {DrawerModule} from 'primeng/drawer';
import {PopoverModule} from 'primeng/popover';
import {TableModule} from 'primeng/table';
import {TabsModule} from 'primeng/tabs';

@Component({
  selector: 'admin-dashboard',
  imports: [
    TableModule,
    AvatarModule,
    TabsModule,
    ButtonModule,
    DrawerModule,
    PopoverModule,
  ],
  templateUrl: './admin.html',
})
export class AdminDashboard {
  sidebarService = inject(SidebarService);

  actions = [
    {
      label: 'Modifier',
      icon: 'pi pi-pen-to-square',
    },
  ];

  visible = false;
  users = [
    {
      name: 'Jean Charle',
      email: 'exemple@gmail.com',
      role: 'admin',
      phone: '034 76 184 52',
      status: 'actif',
    },
  ];
  screen = inject(Screen);

  stores = [
    {
      name: 'Luxe Fashion',
      initials: 'LF',
      category: 'Tech',
      status: 'Open',
      sales: 'Ar 12_000',
    },
    {
      name: 'Tech Haven',
      initials: 'TH',
      category: 'Electronics',
      status: 'Maintenance',
      sales: 'Ar 12_000',
    },
    {
      name: 'Gourmet Hub',
      initials: 'GH',
      category: 'Food & Dining',
      status: 'Open',
      sales: 'Ar 12_000',
    },
  ];

  alerts = [
    {
      type: 'error',
      icon: 'pi-exclamation-triangle',
      iconColor: 'text-red-500',
      title: 'HVAC System Failure',
      desc: 'Wing B, Level 2 reports unusual temperature spikes.',
      time: '12 mins ago',
    },
    {
      type: 'info',
      icon: 'pi-info-circle',
      iconColor: 'text-yellow-500',
      title: 'Elevator Maintenance',
      desc: 'Scheduled maintenance for Lift #4 starts in 30 mins.',
      time: '45 mins ago',
    },
    {
      type: 'success',
      icon: 'pi-megaphone',
      iconColor: 'text-blue-500',
      title: 'Security Check Complete',
      desc: 'All perimeter zones cleared for night shift operation.',
      time: '2 hours ago',
    },
    {
      type: 'neutral',
      icon: 'pi-clock',
      iconColor: 'text-gray-400',
      title: 'Backup Sync',
      desc: 'Database backup successfully synchronized with Cloud Server.',
      time: '4 hours ago',
    },
  ];

  getStatusClass(status: string) {
    const base = 'px-3 py-1 rounded-full text-[10px] font-bold uppercase ';
    switch (status) {
      case 'Open':
        return base + 'bg-green-500/10 text-green-500';
      case 'Maintenance':
        return base + 'bg-orange-500/10 text-orange-500';
      case 'Closed':
        return base + 'bg-red-500/10 text-red-500';
      default:
        return base + 'bg-gray-500/10 text-gray-500';
    }
  }
}
