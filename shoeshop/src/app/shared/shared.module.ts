import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { RatingComponent } from './component/rating/rating.component';
import { LoadingComponent } from './component/loading/loading.component';
import { MessageComponent } from './component/message/message.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AnnouncementComponent } from './component/announcement/announcement.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RatingComponent,
    LoadingComponent,
    MessageComponent,
    NotFoundComponent,
    AnnouncementComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    RatingComponent,
    LoadingComponent,
    MessageComponent,
    AnnouncementComponent,
  ],
})
export class SharedModule {}
