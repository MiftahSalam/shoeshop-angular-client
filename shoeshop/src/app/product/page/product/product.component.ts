import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
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
  loadingAddReview: boolean = true;
  currentError: ErrorModel = { message: '', path: '' };
  currentErrorAddReview: ErrorModel = { message: '', path: '' };
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true; //temporary
    this.loadingAddReview = false; //temporary
    this.quantity = 1;

    console.log('ProductComponent-ngOnInit');

    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe(
        (data) => {
          this.product = data;
          console.log('ProductComponent-ngOnInit getproduct');
        },
        (err) => {
          this.currentError = err;
          console.error('currentError', this.currentError.message);
        },
        () => {
          this.loading = false; //temporary
        }
      );
    });
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  setQuantity() {
    this.quantity = +this.quantity;
    console.log('setQuantity quantity', this.quantity);
  }

  trackByFn(index: number, item: Review) {
    return item.id;
  }
}
