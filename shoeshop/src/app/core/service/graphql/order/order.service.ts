import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';
import {
  CREATE_ORDER,
  GET_ORDER,
  GET_ORDERS_USER,
  OrderInput,
  OrderResponse,
  PaymentResultInput,
  PAY_ORDER,
  Shipping,
} from 'src/app/core/model/graphql/order.graphql';
import {
  STORE_ORDER_PAYMENT_KEY,
  STORE_ORDER_SHIPPING_KEY,
} from 'src/app/shared/constant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private apollo: Apollo) {}

  pay(id: string, status: PaymentResultInput): Observable<OrderResponse> {
    return from(
      this.apollo
        .mutate({
          mutation: PAY_ORDER,
          variables: { id: id, payStatus: status },
        })
        .pipe(
          map(({ loading, data }: any) => {
            const value: OrderResponse = data.payOrder.id as OrderResponse;
            return value;
          })
        )
    );
  }

  getOrdersUser(): Observable<OrderResponse[]> {
    return from(
      this.apollo
        .query({
          query: GET_ORDERS_USER,
        })
        .pipe(
          map(({ loading, data }: any) => {
            console.log('OrderService-getOrdersUser data', data);

            const value: OrderResponse[] =
              data.getUserOrders as OrderResponse[];
            return value;
          }),
          catchError(() => {
            return throwError(() => new Error('Orders not found'));
          })
        )
    );
  }

  getOrder(id: string): Observable<OrderResponse> {
    return from(
      this.apollo
        .query({
          query: GET_ORDER,
          variables: { id: id },
        })
        .pipe(
          map(({ loading, data }: any) => {
            console.log('OrderService-getOrder data', data);

            const value: OrderResponse = data.getOrder as OrderResponse;
            return value;
          }),
          catchError(() => {
            return throwError(() => new Error('Order not found'));
          })
        )
    );
  }

  create(input: OrderInput): Observable<string> {
    return from(
      this.apollo
        .mutate({
          mutation: CREATE_ORDER,
          variables: { data: input },
        })
        .pipe(
          map(({ loading, data }: any) => {
            const value: string = data.createOrder.id as string;
            return value;
          })
        )
    );
  }

  getShippingAddress(): Shipping {
    const storedShippingStr = localStorage.getItem(STORE_ORDER_SHIPPING_KEY);

    if (storedShippingStr) {
      return JSON.parse(storedShippingStr);
    }

    return {} as Shipping;
  }

  getPaymentMethod(): string {
    const storedShippingStr = localStorage.getItem(STORE_ORDER_PAYMENT_KEY);

    return storedShippingStr || '';
  }

  saveShippingAddress(data: Shipping) {
    console.log('OrderService-saveShippingAddress data', data);

    localStorage.setItem(STORE_ORDER_SHIPPING_KEY, JSON.stringify(data));
  }

  savePaymentMethod(data: string) {
    console.log('OrderService-savePaymentMethod data', data);

    localStorage.setItem(STORE_ORDER_PAYMENT_KEY, data);
  }

  clearShippingAddress() {
    console.log('OrderService-clearShippingAddress');

    localStorage.removeItem(STORE_ORDER_SHIPPING_KEY);
  }

  clearPaymentMethod() {
    console.log('OrderService-PaymentMethod');

    localStorage.removeItem(STORE_ORDER_PAYMENT_KEY);
  }
}
