import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Item, UpdateItem } from 'src/app/core/model/graphql/cart.graphql';
import { CartService } from 'src/app/core/service/graphql/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cartItems: Item[] | null = null;

  constructor(
    private cartService: CartService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getAllAvailableCartItems();

    console.log('CartComponent-ngOnInit cartItems:', this.cartItems);
  }

  updateItem(item: UpdateItem) {
    console.log('CartComponent-updateItem item:', item);

    this.cartService.updateCartItem(item);
    this.cartItems = this.cartService.getAllAvailableCartItems();
    this.ref.markForCheck();
  }

  removeItem(id: string) {
    console.log('CartComponent-removeItem id:', id);

    this.cartService.removeItemFromCart(id);
    this.cartItems = this.cartService.getAllAvailableCartItems();
    this.ref.markForCheck();
  }
}
