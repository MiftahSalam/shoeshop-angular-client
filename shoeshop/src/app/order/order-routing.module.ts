import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ROUTE_ORDER_PAYMENT,
  ROUTE_ORDER_PLACE,
  ROUTE_ORDER_SHIPPING,
} from '../shared/constant';
import { OrderComponent } from './page/order/order.component';
import { PaymentComponent } from './page/payment/payment.component';
import { PlaceOrderComponent } from './page/place-order/place-order.component';

import { ShippingComponent } from './page/shipping/shipping.component';
import { OrderResolver } from './resolver/order/order.resolver';

const routes: Routes = [
  {
    path: ROUTE_ORDER_PLACE,
    pathMatch: 'full',
    component: PlaceOrderComponent,
  },
  {
    path: ROUTE_ORDER_SHIPPING,
    pathMatch: 'full',
    component: ShippingComponent,
  },
  {
    path: ROUTE_ORDER_PAYMENT,
    pathMatch: 'full',
    component: PaymentComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: OrderComponent,
    resolve: {
      order: OrderResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
