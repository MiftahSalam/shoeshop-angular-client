import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ErrorModel } from 'src/app/core/model/error';
import { Product, Search } from 'src/app/core/model/graphql/product.graphql';
import { ProductService } from 'src/app/core/service/graphql/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnChanges {
  @Input() query: any;

  loading: boolean = true;
  pages: number = 0;
  page: number = 0;
  keyword: string = '';
  currentError: ErrorModel = { message: '', path: '' };
  products: Product[] | null = new Array<Product>();

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ShopComponent-ngOnChanges query', this.query);

    this.loadProduct();
  }

  ngOnInit(): void {
    console.log('ShopComponent-ngOnInit query', this.query);

    this.loadProduct();
  }

  private loadProduct() {
    console.log('ShopComponent-loadProduct query', this.query);
    const curQuery: Search = this.query.query as Search;

    this.page = curQuery.page || 1;
    this.keyword = curQuery.keyword || '';
    this.loading = true;

    this.productService
      .getProducts({
        keyword: this.keyword,
        limit: curQuery.limit,
        page: this.page,
      })
      .subscribe(
        (data) => {
          console.log('ShopComponent-loadProduct data', data);
          this.products = data?.products!;

          if (this.products && curQuery.limit > 0) {
            this.pages = Math.ceil(data?.totalData! / curQuery.limit);
          } else {
            this.pages = 1;
          }
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
  }

  private calculatePages() {}

  trackByFn(index: number, item: Product) {
    return item.id;
  }
}
