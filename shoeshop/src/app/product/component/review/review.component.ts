import { Component, Input, OnInit } from '@angular/core';

import moment from 'moment';
import { ErrorModel } from 'src/app/core/model/error';

import { Product, Review } from 'src/app/core/model/graphql/product.graphql';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {
  @Input() product: Product | null = {} as Product;

  currentErrorAddReview: ErrorModel = { message: '', path: '' };
  loadingAddReview: boolean = true;

  ngOnInit(): void {
    this.loadingAddReview = false; //temporary
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  trackByFn(index: number, item: Review) {
    return item.id;
  }
}
