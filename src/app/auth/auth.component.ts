import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  LoginFormGroup: FormGroup;
  hide = true;
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService) {
  }

  ngOnInit() {
    this.LoginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isLoading = true;
    this._authService.login(this.LoginFormGroup.value.email, this.LoginFormGroup.value.password).then(
      (res) => {
        this.isLoading = false;
        this._router.navigate(['wizard']);
      }).catch((err) => {
        console.log(err);
        this._toastr.error('Email or Password is incorrect!', 'Login Failed!', {
          timeOut: 3000
        });
        this.isLoading = false;
      });
  }
}
