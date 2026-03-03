import {effect, Injectable, signal} from '@angular/core';
import {Product} from '@m1p13mean-sarobidy-faliana/client';

export type OrderCatalog = {
  catalog?: Catalog;
  /**
   * @type number
   */
  number: number;
  /**
   * @type number
   */
  total_price: number;
};

export type Shop = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string
   */
  name: string;
  /**
   * @type string
   */
  description: string;
  /**
   * @default 0
   * @type number | undefined
   */
  note?: number;
  /**
   * @type string | undefined
   */
};

export type Catalog = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string
   */
  name: string;
  /**
   * @type string
   */
  unit_price: string;
  /**
   * @type number | undefined
   */
  avalaible?: number;
  /**
   * @type number | undefined
   */
  total_order?: number;
};

export interface GroupedOrder {
  shop: any;
  items: OrderCatalog[];
  shopTotal: number;
}

@Injectable({providedIn: 'root'})
export class CartService {
  private localOrders = localStorage.getItem('cart_order');
  orders = signal<OrderCatalog[]>(
    this.localOrders ? JSON.parse(this.localOrders) : []
  );

  constructor() {
    effect(() => {
      localStorage.setItem('cart_order', JSON.stringify(this.orders()));
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart_order') {
        const newValue = event.newValue ? JSON.parse(event.newValue) : [];
        this.orders.set(newValue);
      }
    });
  }

  updateNumber(catalogId: string, val: number | null) {
    if (val === null || val < 1) return;

    this.orders.update((items) =>
      items.map((item) =>
        item.catalog?.id === catalogId
          ? {
              ...item,
              number: val,
              total_price: Number(item.catalog.unit_price) * val,
            }
          : item
      )
    );
  }
  addItemToCart(catalog: Product) {
    // this.orders.update((items) => {
    //   const isAlreadyInCart = items.find(
    //     (item) => item.catalog?.id === catalog.id
    //   );
    //   if (isAlreadyInCart) {
    //     return items.map((item) =>
    //       item.catalog?.id === catalog.id
    //         ? {
    //             ...item,
    //             number: item.number + 1,
    //             total_price:
    //               Number(item.catalog?.unit_price) * (item.number + 1),
    //           }
    //         : item
    //     );
    //   }
    //   return [
    //     ...items,
    //     {
    //       catalog,
    //       number: 1,
    //       total_price: catalog.price,
    //     },
    //   ];
    // });
  }
  getGroupedOrders() {}
  // getGroupedOrders(): GroupedOrder[] {
  //   const currentOrders = this.orders();

  //   const map = new Map<string, GroupedOrder>();

  //   currentOrders.forEach((order) => {
  //     const shop = order.catalog?.shop!;
  //     const shopId = shop.id;

  //     if (!map.has(shopId)) {
  //       map.set(shopId, {
  //         shop: shop,
  //         items: [],
  //         shopTotal: 0,
  //       });
  //     }

  //     const group = map.get(shopId)!;
  //     group.items.push(order);
  //     group.shopTotal += order.total_price;
  //   });

  //   return Array.from(map.values());
  // }

  removeItem(catalogId: string) {
    this.orders.update((items) =>
      items.filter((item) => item.catalog?.id !== catalogId)
    );
  }

  totalCartAmount() {
    return this.orders().reduce((acc, item) => acc + item.total_price, 0);
  }

  clear() {
    this.orders.set([]);
    localStorage.setItem('cart_order', '[]');
  }
}
