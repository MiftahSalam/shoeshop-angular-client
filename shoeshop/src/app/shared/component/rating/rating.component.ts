import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
})
export class RatingComponent {
  @Input() value: number = 3;
  @Input() text: number = 0;
}
