import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
// import { ApolloError } from '@apollo/client'

import {
  Product,
  Search,
  GET_PRODUCTS_ALL_FIELDS,
  Review,
  GET_PRODUCT,
} from '../../../model/graphql/product.graphql';
import { User } from 'src/app/core/model/graphql/user.graphql';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProduct(id: string): Observable<Product | null> {
    return from(
      this.apollo.query({
        query: GET_PRODUCT,
        variables: { id: id },
        errorPolicy: 'all',
      })
    ).pipe(
      map(({ loading, data }: any) => {
        const value: Product = data.getProduct as Product;

        console.log(data);

        return value;
      })
    );
  }

  getProducts(filter: Search): Observable<Product[] | null> {
    return from(
      this.apollo.query({
        query: GET_PRODUCTS_ALL_FIELDS,
        variables: { filter: filter },
        errorPolicy: 'all',
      })
    ).pipe(
      map(({ loading, data }: any) => {
        const value: Product[] = data.getProducts as Product[];
        const products: Product[] = new Array<Product>();

        // console.log(data);

        for (const product of value) {
          // console.log(product);
          // const user: User = {
          //   createdAt: product.reviews,
          //   email: 'sdfsdf',
          //   id: 'wwere',
          //   isAdmin: false,
          //   name: 'asdfsdf',
          // };
          // const review: Review = {
          //   comment: 'dadfsd',
          //   rating: 3,
          //   user: user,
          // };
          // const reviews: Review[] = new Array<Review>();
          // reviews.push(review);
          // const product: Product = {
          //   countInStock: product.countInStock,
          //   id: 'Sdf',
          //   name: 'sdfsdf',
          //   numReviews: 3,
          //   price: 43.4,
          //   rating: 2,
          //   reviews: reviews,
          // };
          products.push(product);
        }

        return products;
      })
    );
    /*
    this.apollo
      .query({ query: GET_PRODUCTS_ALL_FIELDS, errorPolicy: 'all' })
      
      .pipe(
        map((data) => {
          console.log('dataaaaaa', data);
        }),
        catchError((err) => {
          if (err.graphQLErrors) {
            err.graphQLErrors.forEach((e: any) => {
              console.error('errrrooorrrr', e);
            });
          }
          if (err.networkError) {
            console.error('errrrooorrrr network cause', err.networkError.cause);
            console.error(
              'errrrooorrrr network message',
              err.networkError.message
            );
            console.error('errrrooorrrr network name', err.networkError.name);
          }

          return of(['success']);
        })
      )
      
      .subscribe({
        next(value) {
          console.log('dataaaaaa', value);
        },
        error(err) {
          console.error('errrrroooorrrr', err);
        },
      });
      */

    // this.apollo
    //   .query({ query: GET_PRODUCTS_ALL_FIELDS, errorPolicy: 'all' })
    //   .subscribe({
    //     next: (data) => {
    //       console.log(data);
    //     },
    //     error: (err) => {
    //       console.error('errorororroor', err);
    //       if (err.gr) {

    //       } else {

    //       }
    //     },
    //   });
  }
}
