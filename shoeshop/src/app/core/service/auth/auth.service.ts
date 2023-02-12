import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { STORE_USER_LOGIN_KEY } from 'src/app/shared/constant';
import { User } from '../../model/graphql/user.graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setAuth(user: User | null) {
    localStorage.setItem(STORE_USER_LOGIN_KEY, JSON.stringify(user));
  }

  getAuth(): User {
    const storedUserStr = localStorage.getItem(STORE_USER_LOGIN_KEY);
    const user: User = storedUserStr && JSON.parse(storedUserStr);

    return user;
  }

  getToken(): string {
    const user = this.getAuth();
    if (!user) {
      return '';
    }

    const token = user.token;
    if (!token) {
      return '';
    }

    return token;
  }

  checkAuth(): boolean {
    const user = this.getAuth();
    if (!user) {
      return false;
    }

    //todo check jwt expired
    const token = user.token;
    if (!token) {
      return false;
    }

    const decodedToken: any = jwtDecode(token);
    const isExpired = Date.now() > decodedToken.exp * 1000;

    // const expiredDate = new Date(decodedToken.exp * 1000).toLocaleString();
    // console.log('AuthService-checkAuth decodedToken', decodedToken);
    // console.log('AuthService-checkAuth exp', expiredDate);
    // console.log('AuthService-checkAuth now', new Date());
    // console.log('AuthService-checkAuth isExpired', isExpired);

    return !isExpired;
  }

  resetAuth() {
    localStorage.removeItem(STORE_USER_LOGIN_KEY);
  }
}
