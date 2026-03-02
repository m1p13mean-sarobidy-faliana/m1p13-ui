import {CatalogItem} from '@/app/components';
import {Component} from '@angular/core';
import {Catalog as CatalogType} from '@m1p13/client';
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
      name: 'Catalog name',
      unit_price: '2000',
      shop: {
        id: 'shopId',
        name: 'Shop name',
        description: '',
      },
    },
    {
      id: 'idother',
      name: 'Other',
      unit_price: '1000',
      shop: {
        id: 'shopId2',
        name: 'My Shop',
        description: '',
      },
    },
    {
      id: 'idotherfrom',
      name: 'Other From',
      unit_price: '500',
      shop: {
        id: 'shopId2',
        name: 'My Shop',
        description: '',
      },
    },
  ];
}
