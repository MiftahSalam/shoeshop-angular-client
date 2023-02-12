import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './page/profile/profile.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ProfilePageRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfilePage],
  imports: [CommonModule, ProfilePageRoutingModule],
})
export class ProfileModule {}
