import {CatalogItem} from '@/app/components';
import {Component} from '@angular/core';
import {Article as CatalogType} from '@m1p13mean-sarobidy-faliana/client';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Popover, PopoverModule} from 'primeng/popover';
import {CatalogFilter} from './catalog-filter';

@Component({
  selector: 'app-catalog',
  imports: [
    CatalogItem,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PopoverModule,
    Popover,
    ButtonModule,
    CatalogFilter,
    DataViewModule,
  ],
  templateUrl: './catalog.html',
})
export class Catalog {
  catalogs: CatalogType[] = [
    {
      id: 'idid',
      title: 'Bracelet',
      content: 'Shop',
      price: 2000,
    },
    {
      id: 'idother',
      content: 'Shop',
      title: 'Carting',
      price: 1000,
    },
    {
      id: 'idotherfrom',
      title: 'Other From',
      price: 500,
    },
  ];
}
