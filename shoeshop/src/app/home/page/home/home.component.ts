import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/core/model/graphql/product.graphql';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  query: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: ({ ...query }) => {
        console.log('HomeComponent-ngOnInit route.data', query);
        this.query = query;
      },
      error: (err) => {
        console.log('HomeComponent-ngOnInit route error', err);
      },
    });
  }
  // ngAfterViewChecked(): void {
  //   console.log('HomeComponent-ngAfterViewChecked');
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // }
}
