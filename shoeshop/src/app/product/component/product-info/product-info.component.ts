import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/graphql/product.graphql';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
})
export class ProductInfoComponent implements OnInit {
  @Input() product: Product | null = {} as Product;

  quantity: number = 1;

  ngOnInit(): void {
    this.quantity = 1; //temporary. must get from cart
  }

  setQuantity() {
    this.quantity = +this.quantity;
    console.log('setQuantity quantity', this.quantity);
  }
}
