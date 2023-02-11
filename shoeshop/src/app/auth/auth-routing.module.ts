import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_AUTH_LOGIN, ROUTE_AUTH_REGISTER } from '../shared/constant';

import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

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
  {
    path: ROUTE_AUTH_REGISTER,
    pathMatch: 'prefix',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
