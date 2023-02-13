import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorModel, getFormValidationErrors } from 'src/app/core/model/error';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';
import { ROUTE_ORDER } from 'src/app/shared/constant';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  currentError: ErrorModel = { message: '', path: '' };
  formPayment: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService
  ) {
    this.formPayment = fb.group({
      paymentMethod: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.currentError = { message: '', path: '' };
  }

  submitHandler(data: any) {
    console.log('SettingsComponent-submitHandler data', data);

    if (this.formPayment.invalid) {
      const allErrors = getFormValidationErrors(this.formPayment.controls);
      if (allErrors.length > 0) {
        this.currentError.message = `${allErrors[0].control_name} ${allErrors[0].error_name}`;
      }
    } else {
      this.orderService.savePaymentMethod(data.paymentMethod);
      this.router.navigate([ROUTE_ORDER]);
    }
  }
}
