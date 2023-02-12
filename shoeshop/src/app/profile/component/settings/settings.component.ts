import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ErrorModel } from 'src/app/core/model/error';
import { User } from 'src/app/core/model/graphql/user.graphql';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UserService } from 'src/app/core/service/graphql/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  @Input() currentUser: User = {} as User;
  @Output() updateUserv = new EventEmitter<User>();

  updateLoading: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  currentError: ErrorModel = { message: '', path: '' };
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  ngOnInit(): void {
    console.log(
      'SettingsComponent-ngOnInit this.currentUser',
      this.currentUser
    );

    this.settingsForm.setValue({
      name: this.currentUser.name,
      email: this.currentUser.email,
      password: '',
      confirmPassword: '',
    });
  }

  submitHandler(data: any) {
    this.settingsForm.setValue({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    console.log('SettingsComponent-submitHandler data', data);

    if (this.password !== this.confirmPassword) {
      this.toastr.clear();
      this.toastr.error('Password does not match');
    } else {
      this.updateLoading = true;
      this.userService
        .updateUserProfile({
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .subscribe({
          next: (updateUserProfile) => {
            this.currentUser = updateUserProfile as User;
            this.toastr.clear();
            this.toastr.success('Profile updated');
            this.authService.setAuth(this.currentUser);

            console.log(
              'SettingsComponent-submitHandler updatedUser',
              this.currentUser
            );
          },
          error: (err) => {
            this.toastr.error(err.message);
            this.currentError = err;
            this.updateLoading = false;
          },
          complete: () => {
            this.updateLoading = false;
          },
        });
    }
  }
}
