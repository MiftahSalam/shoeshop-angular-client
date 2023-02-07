import { gql } from 'apollo-angular';
import { User } from './user.graphql';

export interface Search {
  keyword: string;
  page: number;
  limit: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  rating: number;
  price: number;
  numReviews: number;
  countInStock: number;
  reviews?: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  user: User;
}

export const GET_PRODUCTS_ALL_FIELDS = gql`
  query products($filter: Search) {
    getProducts(input: $filter) {
      id
      name
      description
      imageUrl
      rating
      price
      numReviews
      countInStock
    }
  }
`;
