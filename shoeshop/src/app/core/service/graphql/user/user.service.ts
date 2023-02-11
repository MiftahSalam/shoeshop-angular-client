import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, from, map } from 'rxjs';

import {
  Login,
  Register,
  User,
  USER_LOGIN,
  USER_REGISTER,
} from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  login(input: Login): Observable<User> {
    return from(
      this.apollo
        .query({
          query: USER_LOGIN,
          variables: { data: input },
        })
        .pipe(
          map(({ loading, data }: any) => {
            console.log(data);

            const value: User = data.login as User;

            return value;
          })
        )
    );
  }

  register(input: Register): Observable<User> {
    return from(
      this.apollo
        .mutate({
          mutation: USER_REGISTER,
          variables: { data: input },
        })
        .pipe(
          map(({ loading, data }: any) => {
            console.log(data);

            const value: User = data.userRegister as User;

            return value;
          })
        )
    );
  }
}
