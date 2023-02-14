import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShippingComponent } from './page/shipping/shipping.component';
import { OrderPageRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './page/payment/payment.component';
import { OrderComponent } from './page/order/order.component';
import { OrdeinfoComponent } from './component/ordeinfo/ordeinfo.component';
import { OrdeitemComponent } from './component/ordeitem/ordeitem.component';
import { PriceInfoComponent } from './component/price-info/price-info.component';
import { PlaceOrderComponent } from './page/place-order/place-order.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    ShippingComponent,
    PaymentComponent,
    OrderComponent,
    OrdeinfoComponent,
    OrdeitemComponent,
    PriceInfoComponent,
    PlaceOrderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    OrderPageRoutingModule,
    SharedModule,
  ],
})
export class OrderModule {}
