import { Component, Input } from '@angular/core';

import { Item } from 'src/app/core/model/graphql/cart.graphql';
import { Shipping } from 'src/app/core/model/graphql/order.graphql';
import { User } from 'src/app/core/model/graphql/user.graphql';

@Component({
  selector: 'order-ordeinfo',
  templateUrl: './ordeinfo.component.html',
})
export class OrdeinfoComponent {
  @Input() userInfo: User = {} as User;
  @Input() shippingInfo: Shipping = {} as Shipping;
  @Input() paymentMethod: string = '';
  @Input() cartItems: Item[] = new Array<Item>();
}
