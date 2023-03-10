import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { Item, UpdateItem } from 'src/app/core/model/graphql/cart.graphql';
import {
  ROUTE_AUTH,
  ROUTE_AUTH_LOGIN,
  ROUTE_ORDER,
  ROUTE_ORDER_SHIPPING,
} from 'src/app/shared/constant';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsComponent implements OnInit, OnChanges {
  @Input() cartItems: Item[] | null = null;
  @Output() removeItemEvent = new EventEmitter<string>();
  @Output() updateItemEvent = new EventEmitter<UpdateItem>();

  total: number = 0;

  constructor(private ref: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.total = this.cartItems
      ? +this.cartItems.reduce((a, i) => a + i.quantity * i.price, 0).toFixed(2)
      : 0;
  }

  checkoutHandler() {
    this.router.navigateByUrl(
      ROUTE_AUTH +
        '/' +
        ROUTE_AUTH_LOGIN +
        `?redirect=${ROUTE_ORDER}/${ROUTE_ORDER_SHIPPING}`
    );
  }

  removeFromCartHandler(id: string) {
    console.log('CartItemDetailComponent-removeFromCartHandler id', id);

    this.removeItemEvent.emit(id);
    this.ref.markForCheck();
  }

  updateItem(item: UpdateItem) {
    console.log('updateItem item', item);
    this.updateItemEvent.emit(item);
    this.ref.markForCheck();
  }

  trackByFn(index: number, item: Item) {
    return item.product.id;
  }
}
