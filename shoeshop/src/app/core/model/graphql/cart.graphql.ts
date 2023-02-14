import { gql } from 'apollo-angular';
import { Product } from './product.graphql';

export interface Item {
  product: Product;
  name: string;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateItem {
  productId: string;
  quantity: number;
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
