import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorModel } from 'src/app/core/model/error';

import { Item } from 'src/app/core/model/graphql/cart.graphql';
import {
  Pricing,
  Shipping,
  itemToItemInput,
  OrderResponse,
} from 'src/app/core/model/graphql/order.graphql';
import { User } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { CartService } from 'src/app/core/service/graphql/cart/cart.service';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';
import {
  ROUTE_AUTH,
  ROUTE_AUTH_LOGIN,
  ROUTE_ORDER,
  ROUTE_ORDER_PAYMENT,
  ROUTE_ORDER_SHIPPING,
} from 'src/app/shared/constant';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceOrderComponent implements OnInit {
  userInfo: User = {} as User;
  shippingInfo: Shipping = {} as Shipping;
  paymentMethod: string = '';
  cartItems: Item[] = new Array<Item>();
  currentError: ErrorModel = { message: '', path: '' };

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getAuth();
    this.shippingInfo = this.orderService.getShippingAddress();
    this.paymentMethod = this.orderService.getPaymentMethod();
    this.cartItems = this.cartService.getAllAvailableCartItems();
  }

  createOrder(price: Pricing) {
    console.log('PlaceOrderComponent-createOrder price', price);

    this.validateOrder();

    this.orderService
      .create({
        items: this.cartItems.map((item) => itemToItemInput(item)),
        paymentMethod: this.paymentMethod,
        shippingAddress: this.shippingInfo,
        shippingPrice: price.shippingPrice,
        taxPrice: price.taxPrice,
        totalPrice: price.totalPrice,
      })
      .subscribe({
        next: (id) => {
          console.log('PlaceOrderComponent-createOrder result', id);

          this.createSuccess();
          this.router.navigate([`/${ROUTE_ORDER}`, id]);
        },
        error: (err) => {
          this.currentError = err;
          this.ref.markForCheck();
        },
        complete: () => {
          this.ref.markForCheck();
        },
      });

    console.log('PlaceOrderComponent-createOrder request create order', price);
  }

  private validateOrder() {
    if (Object.keys(this.userInfo).length === 0) {
      this.toastr.clear();
      this.toastr
        .error('Please loggin first. Will go to login page soon')
        .onHidden.subscribe(() =>
          this.router.navigate([`/${ROUTE_AUTH}`, ROUTE_AUTH_LOGIN])
        );
    } else if (
      Object.keys(this.userInfo).length > 0 &&
      !this.authService.checkAuth()
    ) {
      this.toastr.clear();
      this.toastr
        .error('Session expired. Will go to login page soon')
        .onHidden.subscribe(() =>
          this.router.navigate([`/${ROUTE_AUTH}`, ROUTE_AUTH_LOGIN])
        );
    } else if (Object.keys(this.shippingInfo).length === 0) {
      this.toastr
        .error('Shipping address required. Will go to shipping page soon')
        .onHidden.subscribe(() =>
          this.router.navigate([`/${ROUTE_ORDER}`, ROUTE_ORDER_SHIPPING])
        );
    } else if (!this.paymentMethod) {
      this.toastr
        .error('Payment method required. Will go to payment page soon')
        .onHidden.subscribe(() =>
          this.router.navigate([`/${ROUTE_ORDER}`, ROUTE_ORDER_PAYMENT])
        );
    }
  }

  private createSuccess() {
    this.cartService.clear();
    this.orderService.clearPaymentMethod();
    this.orderService.clearShippingAddress();
  }
}
