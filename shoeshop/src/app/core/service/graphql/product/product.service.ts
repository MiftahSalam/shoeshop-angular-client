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
  ReviewInput,
  ADD_PRODUCT_REVIEW,
  Products,
} from '../../../model/graphql/product.graphql';
import { User } from 'src/app/core/model/graphql/user.graphql';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  addProductReview(data: ReviewInput): Observable<string | null> {
    return from(
      this.apollo.mutate({
        mutation: ADD_PRODUCT_REVIEW,
        variables: { data: data },
        errorPolicy: 'all',
      })
    ).pipe(
      map(({ loading, data }: any) => {
        const value: string = data.createProductReview as string;

        console.log(data);

        return value;
      })
    );
  }

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

  getProducts(filter: Search): Observable<Products | null> {
    return from(
      this.apollo.query({
        query: GET_PRODUCTS_ALL_FIELDS,
        variables: { filter: filter },
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      })
    ).pipe(
      map(({ loading, data }: any) => {
        const value: Products = data.getProducts as Products;

        return value;
      })
    );
  }
}
