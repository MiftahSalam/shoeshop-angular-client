import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment';

import { ErrorModel } from 'src/app/core/model/error';
import { OrderResponse } from 'src/app/core/model/graphql/order.graphql';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
})
export class OrderlistComponent implements OnInit {
  @Input() orders: OrderResponse[] = new Array<OrderResponse>();

  loading: boolean = false;
  currentError: ErrorModel = { message: '', path: '' };

  constructor() {}

  ngOnInit(): void {}

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  trackByFn(index: number, name: OrderResponse): string {
    return name.id;
  }
}
