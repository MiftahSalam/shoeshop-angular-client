import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorModel } from 'src/app/core/model/error';
import { Login } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UserService } from 'src/app/core/service/graphql/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loading: boolean = true;
  email: string = '';
  password: string = '';
  redirectUrl: any;
  currentError: ErrorModel = { message: '', path: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.redirectUrl = this.route.snapshot.queryParams;
    this.nextNavigation();
  }

  submitHandler() {
    const input: Login = {
      email: this.email,
      password: this.password,
    };

    this.loading = true;
    this.currentError = { message: '', path: '' };
    this.userService.login(input).subscribe(
      (data) => {
        console.log('LoginComponent-submitHandler data');

        this.authService.setAuth(data);
        this.nextNavigation();
      },
      (err) => {
        this.currentError = err;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  private nextNavigation() {
    console.log('LoginComponent-nextNavigation redirectUrl', this.redirectUrl);
    if (this.authService.checkAuth()) {
      if (Object.keys(this.redirectUrl).length === 0) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl(this.redirectUrl['redirect']);
      }
    }
  }
}
