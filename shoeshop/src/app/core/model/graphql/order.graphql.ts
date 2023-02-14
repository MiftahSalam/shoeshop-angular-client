import { gql } from 'apollo-angular';
import { Item } from './cart.graphql';
import { User } from './user.graphql';

export interface OrderResponse {
  id: string;
  user: User;
  items: Item[];
  shippingAddress: Shipping;
  paymentMethod: string;
  paymentStatus: PaymentResultInput;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt?: Date;
}

export interface OrderInput {
  items: ItemInput[];
  shippingAddress: Shipping;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface ItemInput {
  productId: string;
  Quantity: number;
  Price: number;
}

export interface Shipping {
  Address: string;
  City: string;
  PostalCode: string;
  Country: string;
}

export interface Pricing {
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface PaymentResultInput {
  id: string;
  status: string;
  email: string;
  updateTime: Date;
}

export const itemToItemInput = (item: Item): ItemInput => {
  const itemInput: ItemInput = {
    Price: item.product.price,
    productId: item.product.id,
    Quantity: item.quantity,
  };

  return itemInput;
};

const ORDER_ALL_FIELDS = gql`
  fragment ALL_FIELDS on OrderResponse {
    id
    user {
      name
      email
    }
    items {
      quantity
      product {
        id
        name
        imageUrl
        price
      }
    }
    shippingAddress {
      Address
      City
      PostalCode
      Country
    }
    paymentMethod
    paymentStatus {
      id
      status
      email
      updateTime
    }
    taxPrice
    shippingPrice
    totalPrice
    isPaid
    paidAt
    isDelivered
    deliveredAt
    createdAt
  }
`;

export const GET_ORDER = gql`
  query get_order($id: ID!) {
    getOrder(id: $id) {
      ...ALL_FIELDS
    }
  }
  ${ORDER_ALL_FIELDS}
`;

export const CREATE_ORDER = gql`
  mutation create_order($data: OrderInput!) {
    createOrder(input: $data) {
      id
    }
  }
`;

export const PAY_ORDER = gql`
  mutation pay_order($id: ID!, $payStatus: PaymentResultInput!) {
    payOrder(id: $id, payment: $payStatus) {
      ...ALL_FIELDS
    }
  }
  ${ORDER_ALL_FIELDS}
`;
