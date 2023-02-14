import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrderResponse } from 'src/app/core/model/graphql/order.graphql';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<OrderResponse> {
  constructor(private orderService: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<OrderResponse> {
    console.log('OrderResolver-resolve route', route);
    return this.orderService.getOrder(route.params['id']);
  }
}
