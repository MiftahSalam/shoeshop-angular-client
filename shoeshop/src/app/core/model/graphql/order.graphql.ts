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

export interface Shipping {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// export interface PaymentResult {
//   status: string;
//   email: string;
//   updateTime: Date;
// }
