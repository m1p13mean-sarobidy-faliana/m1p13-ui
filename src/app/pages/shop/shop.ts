import {CatalogForm} from '@/app/components';
import {Screen} from '@/app/utils/screen';
import {Component, effect, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {ChipModule} from 'primeng/chip';
import {DataViewModule} from 'primeng/dataview';
import {Dialog} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
@Component({
  selector: 'shop-dashboard',
  templateUrl: './shop.html',
  imports: [
    TableModule,
    ButtonModule,
    ChipModule,
    AvatarModule,
    DataViewModule,
    CatalogForm,
    Dialog,
  ],
})
export class Shop {
  screen = inject(Screen);
  route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.route.snapshot.paramMap.get('shopId');
    });
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  topProducts = [
    {
      name: 'Wireless Earbuds Pro',
      sales: 124,
      price: 'Ar12_000',
      trend: 12,
      img: 'path/to/img1',
    },
    {
      name: 'Ultra Smart Watch 4',
      sales: 98,
      price: 'Ar12_000',
      trend: 5,
      img: 'path/to/img2',
    },
    {
      name: 'Mechanical Keyboard',
      sales: 82,
      price: 'Ar12_000',
      trend: -2,
      img: 'path/to/img3',
    },
  ];

  orders = [
    {
      id: '#ORD-90210',
      customer: 'Jane Doe',
      date: 'Oct 24, 2023',
      status: 'Delivered',
      amount: 'Ar12_000',
    },
    {
      id: '#ORD-90211',
      customer: 'Mike Smith',
      date: 'Oct 24, 2023',
      status: 'Processing',
      amount: 'Ar12_000',
    },
    {
      id: '#ORD-90212',
      customer: 'Sarah Connor',
      date: 'Oct 23, 2023',
      status: 'Shipped',
      amount: 'Ar12_000',
    },
  ];
}
