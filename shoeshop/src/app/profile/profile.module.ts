import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfilePage } from './page/profile/profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SettingsComponent } from './component/settings/settings.component';
import { OrderlistComponent } from './component/orderlist/orderlist.component';

@NgModule({
  declarations: [ProfilePage, SettingsComponent, OrderlistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class ProfileModule {}
