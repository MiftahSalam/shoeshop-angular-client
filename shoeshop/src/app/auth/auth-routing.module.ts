import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_AUTH_LOGIN } from '../shared/constant';

import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_AUTH_LOGIN,
    pathMatch: 'full',
  },
  {
    path: ROUTE_AUTH_LOGIN,
    pathMatch: 'prefix',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
