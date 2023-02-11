import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './page/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthPageRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthPageRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {}
