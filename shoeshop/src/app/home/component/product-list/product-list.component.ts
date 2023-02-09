import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/core/model/graphql/product.graphql';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input() product: Product | null = {} as Product;

  ngOnInit(): void {}
}
