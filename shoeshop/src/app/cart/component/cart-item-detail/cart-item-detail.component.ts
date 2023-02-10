import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Item, UpdateItem } from 'src/app/core/model/graphql/cart.graphql';

@Component({
  selector: 'app-cart-item-detail',
  templateUrl: './cart-item-detail.component.html',
})
export class CartItemDetailComponent implements OnInit {
  @Input() cartItem: Item = {} as Item;
  @Output() removeItemEvent = new EventEmitter<string>();
  @Output() updateItemEvent = new EventEmitter<UpdateItem>();

  quantity: number = 1;

  ngOnInit(): void {
    this.quantity = this.cartItem.quantity;
  }

  removeFromCartHandler(id: string) {
    console.log('CartItemDetailComponent-removeFromCartHandler id', id);

    this.removeItemEvent.emit(id);
  }

  updateQuantity(id: string) {
    this.quantity = +this.quantity;
    console.log('updateQuantity quantity', this.quantity);
    this.updateItemEvent.emit({ quantity: this.quantity, productId: id });
  }
}
