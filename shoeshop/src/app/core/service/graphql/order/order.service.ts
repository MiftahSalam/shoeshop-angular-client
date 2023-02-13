import { Injectable } from '@angular/core';
import { Shipping } from 'src/app/core/model/graphql/order.graphql';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  saveShippingAddress(data: Shipping) {
    console.log('OrderService-saveShippingAddress data', data);

    localStorage.setItem('shipping', JSON.stringify(data));
  }
}
