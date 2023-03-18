import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from 'src/app/core/model/graphql/order.graphql';
import { User } from 'src/app/core/model/graphql/user.graphql';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  currentUser: User = {} as User;
  orders: OrderResponse[] = new Array<OrderResponse>();

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: ({ ...profile }) => {
        this.currentUser = profile['profile'] as User;

        console.log('ProfilePage-ngOnInit currentUser', this.currentUser);

        this.orderService.getOrdersUser().subscribe({
          next: (orders) => {
            console.log('ProfilePage-ngOnInit orders', orders);
            this.orders = orders;
          },
          error: (err) => {},
        });
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
