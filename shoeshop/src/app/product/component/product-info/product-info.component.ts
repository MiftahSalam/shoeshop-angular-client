import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/model/graphql/cart.graphql';
import { Product } from 'src/app/core/model/graphql/product.graphql';
import { CartService } from 'src/app/core/service/graphql/cart/cart.service';
import { ROUTE_CART } from 'src/app/shared/constant';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
})
export class ProductInfoComponent implements OnInit {
  @Input() product: Product | null = {} as Product;

  quantity: number = 1;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = 1; //temporary. must get from cart
  }

  addToCart() {
    const item: Item = {
      name: this.product!.name,
      price: this.product!.price * this.quantity,
      product: this.product!,
      quantity: this.quantity,
    };

    console.log('ProductInfoComponent addToCart', item);

    this.cartService.addCartItem(item);
    this.router.navigate([ROUTE_CART]);
  }

  setQuantity() {
    this.quantity = +this.quantity;
    console.log('setQuantity quantity', this.quantity);
  }
}
