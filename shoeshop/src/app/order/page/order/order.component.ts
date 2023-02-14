import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { ErrorModel } from 'src/app/core/model/error';
import { OrderResponse } from 'src/app/core/model/graphql/order.graphql';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  currentOrder: OrderResponse = {} as OrderResponse;
  currentError: ErrorModel = { message: '', path: '' };
  payPalConfig?: IPayPalConfig;
  loading: boolean = true;
  loadingPay: boolean = false;
  showSuccess: boolean = true;
  showCancel: boolean = false;
  showError: boolean = false;
  itemsPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadingPay = false;
    this.route.data.subscribe({
      next: ({ ...order }) => {
        this.currentOrder = order['order'] as OrderResponse;
        this.itemsPrice = this.addDecimal(
          this.currentOrder.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )
        );
        this.loading = false;
      },
      error: (err) => {
        console.log('OrderComponent-ngOnInit err', err);
        this.loading = false;
        this.currentError.message = err;
      },
      complete: () => {},
    });

    this.initConfig();
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  private addDecimal(num: number) {
    return Math.round(num * 100) / 100;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
    };
  }

  private resetStatus() {
    this.orderService
      .pay(this.currentOrder.id, {
        id: 'pay-122fddf-54323',
        email: this.currentOrder.user.email,
        status: 'Paid Success',
        updateTime: new Date(),
      })
      .subscribe({
        next: ({ ...order }) => {
          this.currentOrder = order as OrderResponse;

          window.location.reload();
        },
        error: (err) => {
          console.log('OrderComponent-ngOnInit err', err);
          this.loading = false;
          this.currentError.message = err;
        },
        complete: () => {},
      });
  }
}
