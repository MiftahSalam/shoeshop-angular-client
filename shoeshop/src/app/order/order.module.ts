import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShippingComponent } from './page/shipping/shipping.component';
import { OrderPageRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './page/payment/payment.component';

@NgModule({
  declarations: [ShippingComponent, PaymentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderPageRoutingModule,
    SharedModule,
  ],
})
export class OrderModule {}
