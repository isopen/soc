import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../auth.service';

@Component({
  selector: '.login_form',
  templateUrl: '../views/login.component.html',
  providers: [
    AuthService
  ]
})
export class LoginComponent {
 
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
 
  ngOnInit(): void {}
  
  login(form: NgForm): void {
    
    var params = {},
        login = this.cookieService.get('_login'),
        token = this.cookieService.get('_token');
    if(login == form.value.login && token) {
      params = {
        login: form.value.login,
        token: token,
        fl_auth_page: true
      };
    }else {
      params = {
        login: form.value.login,
        password: form.value.password,
        fl_auth_page: true
      };
    }

    this.authService.auth_client(params);
    
  }
  
}