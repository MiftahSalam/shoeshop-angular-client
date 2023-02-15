import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pages: number = 0;
  @Input() page: number = 0;
  @Input() keyword: string = '';

  goToPage: string = '';

  ngOnInit(): void {
    console.log('PaginationComponent-ngOnInit pages', this.pages);
    console.log('PaginationComponent-ngOnInit page', this.page);
    console.log('PaginationComponent-ngOnInit keyword', this.keyword);

    if (this.keyword) {
      this.goToPage = `/search/${this.keyword}/page/`;
    } else {
      this.goToPage = `/page/`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PaginationComponent-ngOnInit pages', this.pages);
    console.log('PaginationComponent-ngOnInit page', this.page);
    console.log('PaginationComponent-ngOnInit keyword', this.keyword);
  }
}
