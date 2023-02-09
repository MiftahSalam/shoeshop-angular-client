import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorModel } from 'src/app/core/model/error';
import { Product, Review } from 'src/app/core/model/graphql/product.graphql';
import { ProductService } from 'src/app/core/service/graphql/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  loading: boolean = true;
  currentError: ErrorModel = { message: '', path: '' };
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    console.log('ProductComponent-ngOnInit');

    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe(
        (data) => {
          this.product = data;
          console.log('ProductComponent-ngOnInit getproduct');
        },
        (err) => {
          console.error('currentError', this.currentError.message);

          this.currentError = err;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    });
  }
}
