import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/model/graphql/cart.graphql';
import { CartService } from 'src/app/core/service/graphql/cart/cart.service';

@Component({
  selector: 'order-ordeitem',
  templateUrl: './ordeitem.component.html',
})
export class OrdeitemComponent implements OnInit {
  @Input() cartItems: Item[] = new Array<Item>();

  // constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: Item): string {
    return item.product.id;
  }
}
