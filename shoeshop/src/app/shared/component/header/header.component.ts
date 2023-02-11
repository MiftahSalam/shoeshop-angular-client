import { Component, OnInit, Input } from '@angular/core';

import { User } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { CartService } from 'src/app/core/service/graphql/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit /*, OnChanges*/ {
  @Input() hideSearch: boolean = false;
  @Input() hideSettings: boolean = false;
  currentUser: User = {} as User;
  cartsCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log('HeaderComponent-ngOnInit hideSearch', this.hideSearch);

    const curCart = this.cartService.getAllAvailableCartItems();
    this.currentUser = this.authService.getAuth();
    this.cartsCount = curCart && curCart.length;
  }

  // ngOnChanges(): void {
  //   const curCart = this.cartService.getAllAvailableCartItems();
  //   this.currentUser = this.authService.getAuth();
  //   this.cartsCount = curCart && curCart.length;
  // }

  logoutHandler() {}
}
