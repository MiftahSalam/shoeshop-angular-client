import { Injectable } from '@angular/core';

import { STORE_USER_LOGIN_KEY } from 'src/app/shared/constant';
import { User } from '../../model/graphql/user.graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setAuth(user: User) {
    localStorage.setItem(STORE_USER_LOGIN_KEY, JSON.stringify(user));
  }

  getAuth(): User {
    const storedUserStr = localStorage.getItem(STORE_USER_LOGIN_KEY);
    const user: User = storedUserStr && JSON.parse(storedUserStr);

    return user;
  }

  checkAuth(): boolean {
    const user = this.getAuth();
    if (!user) {
      return false;
    }

    //todo check jwt expired
    return true; //temporary
  }
}
