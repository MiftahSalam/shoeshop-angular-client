import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ErrorModel } from 'src/app/core/model/error';
import { Register } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UserService } from 'src/app/core/service/graphql/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  redirectUrl: any;
  currentError: ErrorModel = { message: '', path: '' };
  form: FormGroup = this.fb.group({
    username: '',
    email: '',
    password: '',
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParams;
  }

  submitHandler() {
    const input: Register = {
      name: this.username,
      email: this.email,
      password: this.password,
    };

    this.loading = true;
    this.currentError = { message: '', path: '' };
    this.form.disable();

    this.userService.register(input).subscribe(
      (data) => {
        console.log('RegisterComponent-submitHandler data', data);

        this.authService.setAuth(data);
        this.nextNavigation();
      },
      (err) => {
        this.currentError = err;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.form.enable();
      }
    );
  }

  private nextNavigation() {
    console.log(
      'RegisterComponent-nextNavigation redirectUrl',
      this.redirectUrl
    );

    if (Object.keys(this.redirectUrl).length === 0) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl(this.redirectUrl['redirect']);
    }
  }
}
