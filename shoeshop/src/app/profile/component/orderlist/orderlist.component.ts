import { Component } from '@angular/core';
import { ErrorModel } from 'src/app/core/model/error';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
})
export class OrderlistComponent {
  loading: boolean = false;
  currentError: ErrorModel = { message: '', path: '' };
  orders: any[] = new Array<any>();
}
