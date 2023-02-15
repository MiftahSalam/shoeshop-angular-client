import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import {
  ROUTE_AUTH,
  ROUTE_CART,
  ROUTE_HOME,
  ROUTE_HOME_PAGE,
  ROUTE_HOME_SEARCH,
  ROUTE_ORDER,
  ROUTE_PRODUCT,
  ROUTE_PROFILE,
} from './shared/constant';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
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
    path: ROUTE_PROFILE,
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: ROUTE_ORDER,
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
    canActivate: [AuthGuard],
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
