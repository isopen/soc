import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { CookieService } from 'ngx-cookie-service';

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

    this.authService.auth_client(form);
    
  }
  
}