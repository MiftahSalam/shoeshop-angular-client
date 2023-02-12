import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from './service/graphql/product/product.service';
import { MomentDatePipe } from './pipe/moment-date.pipe';

@NgModule({
  declarations: [MomentDatePipe],
  imports: [CommonModule],
  providers: [ProductService],
  exports: [MomentDatePipe],
})
export class CoreModule {}
