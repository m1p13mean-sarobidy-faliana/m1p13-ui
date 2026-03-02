import {CartService} from '@/app/pages/cart/cart-service';
import {Component, inject, input, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Catalog} from '@m1p13/client';
import {ToastrService} from 'ngx-toastr';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ChipModule} from 'primeng/chip';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {ImageModule} from 'primeng/image';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TagModule} from 'primeng/tag';
import {TooltipModule} from 'primeng/tooltip';
import {CatalogForm} from './catalog-form';

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
    TooltipModule,
    DialogModule,
    CatalogForm,
  ],
  templateUrl: './catalog-item.html',
})
export class CatalogItem {
  item = input.required<Catalog>();
  cartService = inject(CartService);
  toast = inject(ToastrService);
  visible: boolean = false;

  products = signal<any>([]).set([this.item]);
  options: any[] = ['list', 'grid'];

  addCart() {
    this.cartService.addItemToCart(this.item());
    this.toast.success('Ajouté au panier');
  }

  showDialog() {
    this.visible = true;
  }
}
