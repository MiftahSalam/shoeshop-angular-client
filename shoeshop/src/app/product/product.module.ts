import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './page/product/product.component';
import { ProductPageRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, FormsModule, ProductPageRoutingModule, SharedModule],
})
export class ProductModule {}
