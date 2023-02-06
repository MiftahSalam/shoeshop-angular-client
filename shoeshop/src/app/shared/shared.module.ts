import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { RatingComponent } from './component/rating/rating.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, RatingComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, RatingComponent],
})
export class SharedModule {}
