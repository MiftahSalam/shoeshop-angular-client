import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ErrorModel } from 'src/app/core/model/error';
import { Item } from 'src/app/core/model/graphql/cart.graphql';
import { Pricing } from 'src/app/core/model/graphql/order.graphql';

@Component({
  selector: 'order-price-info',
  templateUrl: './price-info.component.html',
})
export class PriceInfoComponent implements OnInit, OnChanges {
  @Input() cartItems: Item[] = new Array<Item>();
  @Input() currentError: ErrorModel = { message: '', path: '' };
  @Output() order = new EventEmitter<Pricing>();

  itemsPrice: number = 0;
  shippingPrice: number = 0;
  taxPrice: number = 0;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.itemsPrice = this.addDecimal(
      this.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
    this.shippingPrice = this.addDecimal(this.itemsPrice > 100 ? 0 : 100);
    this.taxPrice = this.addDecimal(Number(0.15 * this.itemsPrice));
    this.totalPrice = this.itemsPrice + this.shippingPrice + this.taxPrice;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PriceInfoComponent-ngOnChanges changes', changes);
  }

  placeOrderHandler() {
    if (this.totalPrice > 0) {
      this.order.emit({
        taxPrice: this.taxPrice,
        shippingPrice: this.shippingPrice,
        totalPrice: this.totalPrice,
      });
    }
  }

  private addDecimal(num: number) {
    return Math.round(num * 100) / 100;
  }
}
