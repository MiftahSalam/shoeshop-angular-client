import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_ORDER_PAYMENT, ROUTE_ORDER_SHIPPING } from '../shared/constant';
import { PaymentComponent } from './page/payment/payment.component';

import { ShippingComponent } from './page/shipping/shipping.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
