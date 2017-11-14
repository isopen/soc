import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: '.login_form',
  templateUrl: '../views/login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login(form: NgForm): void {

    const params = {
      login: form.value.login,
      password: form.value.password,
      fl_auth_page: true
    };

    this.authService.auth_client(params);

  }

}
