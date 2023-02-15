import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ROUTE_HOME,
  ROUTE_HOME_PAGE,
  ROUTE_HOME_SEARCH,
} from '../shared/constant';

import { HomeComponent } from './page/home/home.component';
import { SearchResolver } from './resolver/search.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { query: SearchResolver },
    children: [
      {
        path: ROUTE_HOME,
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ROUTE_HOME_PAGE,
    pathMatch: 'prefix',
    children: [
      {
        path: ':pageNumber',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: { query: SearchResolver },
      },
    ],
  },
  {
    path: ROUTE_HOME_SEARCH,
    pathMatch: 'prefix',
    children: [
      {
        path: ':keyword',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: { query: SearchResolver },
      },
    ],
  },
  {
    path: ROUTE_HOME_SEARCH,
    pathMatch: 'prefix',
    children: [
      {
        path: ':keyword',
        pathMatch: 'prefix',
        children: [
          {
            path: 'page',
            pathMatch: 'prefix',
            children: [
              {
                path: ':pageNumber',
                pathMatch: 'full',
                component: HomeComponent,
                resolve: { query: SearchResolver },
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
