import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { CartService } from 'src/app/core/service/graphql/cart/cart.service';
import { ROUTE_HOME_SEARCH } from '../../constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit /*, OnChanges*/ {
  @Input() hideSearch: boolean = false;
  @Input() hideSettings: boolean = false;

  currentUser: User | null = {} as User;
  cartsCount: number = 0;
  keyword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log('HeaderComponent-ngOnInit hideSearch', this.hideSearch);

    const curCart = this.cartService.getAllAvailableCartItems();
    if (this.authService.checkAuth()) {
      this.currentUser = this.authService.getAuth();
    } else {
      this.authService.resetAuth();
      this.currentUser = null;
    }

    this.cartsCount = curCart && curCart.length;
  }

  onSubmitHandler() {
    console.log('HeaderComponent-onSubmitHandler keyword', this.keyword);
    this.router.navigate([ROUTE_HOME_SEARCH, this.keyword]);
  }

  logoutHandler() {
    this.authService.resetAuth();
    window.location.reload();
  }
}
