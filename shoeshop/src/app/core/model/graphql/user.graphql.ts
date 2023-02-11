import { gql } from 'apollo-angular';

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export const USER_LOGIN = gql`
  query userLogin($data: Login!) {
    login(input: $data) {
      id
      name
      email
      token
      isAdmin
      createdAt
    }
  }
`;

export const USER_REGISTER = gql`
  mutation register($data: Register!) {
    userRegister(input: $data) {
      id
      name
      email
      token
      isAdmin
      createdAt
    }
  }
`;
