import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './page/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CallToActionComponent } from './component/call-to-action/call-to-action.component';
import { ContactInfoComponent } from './component/contact-info/contact-info.component';
import { ShopComponent } from './component/shop/shop.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    CallToActionComponent,
    ContactInfoComponent,
    ShopComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}
