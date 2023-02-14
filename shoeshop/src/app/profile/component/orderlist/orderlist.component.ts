import { Component, OnInit } from '@angular/core';
import moment from 'moment';

import { ErrorModel } from 'src/app/core/model/error';
import { OrderResponse } from 'src/app/core/model/graphql/order.graphql';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
})
export class OrderlistComponent implements OnInit {
  loading: boolean = false;
  currentError: ErrorModel = { message: '', path: '' };
  orders: OrderResponse[] = new Array<OrderResponse>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrdersUser().subscribe({
      next: (orders) => {
        console.log('OrderlistComponent-ngOnInit orders', orders);
        this.orders = orders;
      },
      error: (err) => {},
    });
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  trackByFn(index: number, name: OrderResponse): string {
    return name.id;
  }
}
