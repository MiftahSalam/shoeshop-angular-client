import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartComponent } from './page/cart/cart.page';
import { RouterModule } from '@angular/router';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartItemDetailComponent } from './component/cart-item-detail/cart-item-detail.component';
import { CartItemsComponent } from './component/cart-items/cart-items.component';

@NgModule({
  declarations: [CartComponent, CartItemDetailComponent, CartItemsComponent],
  imports: [CommonModule, RouterModule, FormsModule, CartPageRoutingModule],
})
export class CartModule {}
