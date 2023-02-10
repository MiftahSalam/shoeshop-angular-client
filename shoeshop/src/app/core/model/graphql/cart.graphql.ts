import { gql } from 'apollo-angular';
import { Product } from './product.graphql';
// import { User } from './user.graphql';

// export interface Order {
//   id?: string;
//   user?: User;
//   items: [Item];
//   shippingAddress: Shipping;
//   paymentMethod: string;
//   paymentStatus: PaymentResult;
//   taxPrice: number;
//   shippingPrice: number;
//   totalPrice: number;
//   isPaid: boolean;
//   paidAt: Date;
//   isDelivered: boolean;
//   deliveredAt: Date;
//   createdAt: Date;
// }

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

// export interface Shipping {
//   Address: string;
//   City: string;
//   PostalCode: string;
//   Country: string;
// }

// export interface PaymentResult {
//   status: string;
//   email: string;
//   updateTime: Date;
// }

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
