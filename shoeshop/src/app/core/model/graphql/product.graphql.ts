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
  id: string;
  rating: number;
  comment: string;
  user: User;
  created_date: string;
}

export interface ReviewInput {
  productId: string;
  rating: number;
  comment: string;
}

const PRODUCT_COMMON_FIELDS = gql`
  fragment COMMON_FIELDS on Product {
    id
    name
    imageUrl
    rating
    price
    numReviews
  }
`;

export const ADD_PRODUCT_REVIEW = gql`
  mutation add_review($data: ReviewInput!) {
    createProductReview(input: $data)
  }
`;

export const GET_PRODUCT = gql`
  query product($id: ID!) {
    getProduct(id: $id) {
      ...COMMON_FIELDS
      description
      countInStock
      reviews {
        id
        rating
        comment
        user {
          name
        }
        created_date
      }
    }
  }
  ${PRODUCT_COMMON_FIELDS}
`;

export const GET_PRODUCTS_ALL_FIELDS = gql`
  query products($filter: Search) {
    getProducts(input: $filter) {
      ...COMMON_FIELDS
    }
  }
  ${PRODUCT_COMMON_FIELDS}
`;
