import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorModel, getFormValidationErrors } from 'src/app/core/model/error';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';
import { ROUTE_ORDER, ROUTE_ORDER_PAYMENT } from 'src/app/shared/constant';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent implements OnInit {
  currentError: ErrorModel = { message: '', path: '' };
  formShipping: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService
  ) {
    this.formShipping = fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.currentError = { message: '', path: '' };
  }

  submitHandler(data: any) {
    console.log('SettingsComponent-submitHandler data', data);

    if (this.formShipping.invalid) {
      const allErrors = getFormValidationErrors(this.formShipping.controls);
      if (allErrors.length > 0) {
        this.currentError.message = `${allErrors[0].control_name} ${allErrors[0].error_name}`;
      }
    } else {
      this.orderService.saveShippingAddress({
        Address: data.address,
        City: data.city,
        Country: data.country,
        PostalCode: data.postalCode,
      });
      this.router.navigate([ROUTE_ORDER, ROUTE_ORDER_PAYMENT]);
    }
  }
}
