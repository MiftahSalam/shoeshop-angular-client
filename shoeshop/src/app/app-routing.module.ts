import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import {
  ROUTE_AUTH,
  ROUTE_CART,
  ROUTE_HOME,
  ROUTE_PRODUCT,
} from './shared/constant';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ROUTE_HOME,
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: ROUTE_PRODUCT,
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: ROUTE_CART,
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: ROUTE_AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
