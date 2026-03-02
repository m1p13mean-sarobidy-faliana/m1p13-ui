import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Chip} from 'primeng/chip';
import {DataViewModule} from 'primeng/dataview';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {PopoverModule} from 'primeng/popover';
import {TagModule} from 'primeng/tag';
@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.html',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PopoverModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    Chip,
  ],
})
export class ShopList {
  router = inject(Router);
  shops = signal([
    {
      id: 'shopId1',
      name: 'Urban Threads',
      manager: 'John Doe',
      category: 'FASHION',
      img: '',
    },
    {
      id: 'shopId2',
      name: 'Tech Galaxy',
      manager: 'Sarah Smith',
      category: 'ELECTRONICS',
      img: '',
    },
  ]);

  categories = signal([
    {label: 'Fashion', value: 'FASHION'},
    {label: 'Electronics', value: 'ELECTRONICS'},
    {label: 'Food & Beverage', value: 'FOOD'},
    {label: 'Beauty', value: 'BEAUTY'},
    {label: 'Home Decor', value: 'HOME'},
  ]);

  selectedCategories = signal<string[]>([]);

  toggleCategory(value: string) {
    this.selectedCategories.update((current) =>
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
