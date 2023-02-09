import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
// import { Apollo, gql } from 'apollo-angular';
// import { Subscription } from 'rxjs';
import { ErrorModel } from 'src/app/core/model/error';
import {
  GET_PRODUCTS_ALL_FIELDS,
  Product,
} from 'src/app/core/model/graphql/product.graphql';
import { ProductService } from 'src/app/core/service/graphql/product/product.service';

// import {
//   GET_PRODUCTS_ALL_FIELDS,
//   ProductFilter,
// } from '../../../core/model/graphql/product.graphql';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit /*, OnDestroy*/ {
  // private querySubscription: Subscription = new Subscription();
  loading: boolean = true;
  currentError: ErrorModel = { message: '', path: '' };
  products: Product[] | null = new Array<Product>();

  // constructor(private apollo: Apollo) {}
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService
      .getProducts({ keyword: '', limit: 10, page: 0 })
      // .pipe(
      //   catchError((err) => {
      //     console.error('errrrroooorrrr', err);
      //     this.currentError = err;

      //     return throwError(() => new Error(err));
      //   })
      // )
      /*
      .pipe(
        tap(
          (value) => {
            console.log('dataaaaaa', value);
            this.products = value;
          },
          catchError((err) => {
            console.error('errrrroooorrrr', err);
            this.currentError = err;

            return of([]);
          })
        )
      )
      */
      .subscribe(
        (data) => {
          this.products = data;
        },
        (err) => {
          console.error('currentError', this.currentError.message);

          this.currentError = err;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    // this.apollo
    //   .watchQuery<any>({ query: GET_PRODUCTS_ALL_FIELDS })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     console.log(data);
    //   });
  }

  trackByFn(index: number, item: Product) {
    return item.id;
  }

  ngOnDestroy(): void {
    // this.querySubscription.unsubscribe;
  }
}
