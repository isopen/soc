import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: '.reg_form',
  templateUrl: '../views/reg.component.html',
  providers: [
    AuthService
  ]
})
export class RegComponent {
 
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
 
  ngOnInit(): void {}
  
  reg(form: NgForm): void {
    
    this.authService.reg_client(form);
    
  }
  
}