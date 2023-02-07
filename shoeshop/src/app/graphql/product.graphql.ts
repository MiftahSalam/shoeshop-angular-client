import { gql } from 'apollo-angular';

export interface ProductFilter {
  keyword: string;
  page: Number;
  limit: Number;
}

export const GET_PRODUCTS = gql`
  {
    getProducts {
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
