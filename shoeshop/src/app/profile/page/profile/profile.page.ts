import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/model/graphql/user.graphql';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  currentUser: User = {} as User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: ({ ...profile }) => {
        this.currentUser = profile['profile'] as User;
        console.log('ProfilePage-ngOnInit currentUser', this.currentUser);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
