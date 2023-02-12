import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTE_AUTH, ROUTE_AUTH_LOGIN } from 'src/app/shared/constant';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('AuthGuard-canActivate state', state);

    if (!this.authService.checkAuth()) {
      const url = state.url;
      this.router.navigate(['/', ROUTE_AUTH, ROUTE_AUTH_LOGIN], {
        queryParams: { redirect: url },
      });
    }

    return true;
  }
}
