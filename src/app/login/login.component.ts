import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/', 'dashboard']);
    }
    this.route.queryParams
      .subscribe((params) => {
          if (params.loginAgain) {
            this.message = 'You have no access to Administrator! Please sign in!!';
          } else if (params.authFailed) {
            this.message = 'Session has expired! Please sign in again!!';
          }
        }
      );

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    console.log('Loading...');
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };
    // console.log(user);

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/', 'dashboard']);
      this.submitted = false;
    }, error => {
      console.log('Sign in ERROR:', error);
      this.submitted = false;
    }, () => {
      console.log('Firebase loading done');
      this.submitted = false;
    });
  }

}
