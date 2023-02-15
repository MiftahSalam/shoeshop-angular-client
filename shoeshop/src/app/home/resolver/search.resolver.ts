import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Search } from 'src/app/core/model/graphql/product.graphql';

@Injectable({
  providedIn: 'root',
})
export class SearchResolver implements Resolve<Search> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Search> {
    console.log('SearchResolver route', route);

    const query: Search = {
      keyword: route.params['keyword'],
      page: route.params['pageNumber'],
      limit: 2,
    };

    console.log('SearchResolver query', query);
    return of(query);
  }
}
