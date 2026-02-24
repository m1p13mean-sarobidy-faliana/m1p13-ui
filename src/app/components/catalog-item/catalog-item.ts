import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Catalog} from '@m1p13/client';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ChipModule} from 'primeng/chip';
import {DataViewModule} from 'primeng/dataview';
import {ImageModule} from 'primeng/image';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TagModule} from 'primeng/tag';

@Component({
  selector: 'catalog-item',
  imports: [
    SelectButtonModule,
    TagModule,
    ButtonModule,
    FormsModule,
    DataViewModule,
    CardModule,
    ChipModule,
    ImageModule,
  ],
  templateUrl: './catalog-item.html',
})
export class CatalogItem {
  item: Catalog = {
    id: 'catalog_id',
    name: 'Zavatra',
    unit_price: 'Ar 2000',
    shop: {
      id: 'shop_1',
      name: 'Shop liantsoa',
      description: '',
    },
  };

  products = signal<any>([]).set([this.item]);
  options: any[] = ['list', 'grid'];
}
