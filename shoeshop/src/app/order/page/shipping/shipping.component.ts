import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorModel } from 'src/app/core/model/error';
import { OrderService } from 'src/app/core/service/graphql/order/order.service';
import { ROUTE_ORDER, ROUTE_ORDER_PAYMENT } from 'src/app/shared/constant';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

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
      const allErrors = this.getFormValidationErrors(
        this.formShipping.controls
      );
      if (allErrors.length > 0) {
        this.currentError.message = `${allErrors[0].control_name} ${allErrors[0].error_name}`;
      }
    } else {
      this.orderService.saveShippingAddress({
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
      });
      this.router.navigate([ROUTE_ORDER, ROUTE_ORDER_PAYMENT]);
    }
  }

  private getFormValidationErrors(
    controls: FormGroupControls
  ): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors: ValidationErrors | null = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[keyError],
          });
        });
      }
    });
    return errors;
  }
}
