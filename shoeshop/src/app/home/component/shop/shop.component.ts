import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { GET_PRODUCTS, ProductFilter } from '../../../graphql/product.graphql';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit /*, OnDestroy*/ {
  // private querySubscription: Subscription = new Subscription();

  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({ query: GET_PRODUCTS })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    // this.querySubscription.unsubscribe;
  }
}
