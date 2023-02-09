import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './page/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CallToActionComponent } from './component/call-to-action/call-to-action.component';
import { ContactInfoComponent } from './component/contact-info/contact-info.component';
import { ShopComponent } from './component/shop/shop.component';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from './home-routing.module';
import { ProductListComponent } from './component/product-list/product-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    CallToActionComponent,
    ContactInfoComponent,
    ShopComponent,
    ProductListComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, HomePageRoutingModule],
  exports: [HomeComponent],
})
export class HomeModule {}
