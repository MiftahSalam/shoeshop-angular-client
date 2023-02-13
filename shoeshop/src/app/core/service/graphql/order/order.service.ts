import { Injectable } from '@angular/core';
import { Shipping } from 'src/app/core/model/graphql/order.graphql';
import {
  STORE_ORDER_PAYMENT,
  STORE_ORDER_SHIPPING,
} from 'src/app/shared/constant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  saveShippingAddress(data: Shipping) {
    console.log('OrderService-saveShippingAddress data', data);

    localStorage.setItem(STORE_ORDER_SHIPPING, JSON.stringify(data));
  }

  savePaymentMethod(data: string) {
    console.log('OrderService-savePaymentMethod data', data);

    localStorage.setItem(STORE_ORDER_PAYMENT, data);
  }
}
