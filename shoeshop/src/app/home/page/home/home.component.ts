import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    console.log('HomeComponent-ngAfterViewChecked');

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
