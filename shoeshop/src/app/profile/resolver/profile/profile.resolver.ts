import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/model/graphql/user.graphql';
import { UserService } from 'src/app/core/service/graphql/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<User> {
    return this.userService.getUserProfile();
  }
}
