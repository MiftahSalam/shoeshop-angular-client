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

export const USER_LOGIN = gql`
  query userLogin($data: Login!) {
    login(input: $data) {
      name
      name
      email
      token
      isAdmin
      createdAt
    }
  }
`;
