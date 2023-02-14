import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import moment from 'moment';
import { ErrorModel } from 'src/app/core/model/error';

import { Product, Review } from 'src/app/core/model/graphql/product.graphql';
import { User } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { ProductService } from 'src/app/core/service/graphql/product/product.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit, OnChanges {
  @Input() product: Product | null = {} as Product;

  loadingAddReview: boolean = true;
  rating: number = 0;
  comment: string = '';
  redirectUrl: any;
  currentUser: User | null = {} as User;
  currentErrorAddReview: ErrorModel = { message: '', path: '' };

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ReviewComponent-ngOnChanges changes', changes);
    this.product = changes['product'].currentValue;
  }

  ngOnInit(): void {
    console.log('ReviewComponent-ngOnInit product', this.product);

    this.redirectUrl = `redirect=${this.product?.id}`;
    this.loadingAddReview = false; //temporary
    if (this.authService.checkAuth()) {
      this.currentUser = this.authService.getAuth();
    } else {
      this.currentUser = null;
    }
  }

  submitHandler(data: any) {
    console.log('ReviewComponent-submitHandler rating', this.rating);

    if (!this.rating) {
      this.currentErrorAddReview.message = 'Invalid rating input';
      return;
    } else if (!this.comment) {
      this.currentErrorAddReview.message = 'Invalid comment input';
      return;
    }

    this.loadingAddReview = true;
    this.productService
      .addProductReview({
        productId: this.product?.id!,
        rating: this.rating,
        comment: this.comment,
      })
      .subscribe({
        next: (result) => {
          if (result?.includes('already')) {
            this.currentErrorAddReview.message = result;
            return;
          }

          alert('Review submitted');

          this.comment = '';
          this.rating = 0;
          this.loadingAddReview = false;

          window.location.reload();
        },
        error: (err) => {
          this.currentErrorAddReview.message = err;
          this.loadingAddReview = false;
        },
        complete: () => {
          this.loadingAddReview = false;
        },
      });
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  trackByFn(index: number, item: Review) {
    return item.id;
  }
}
