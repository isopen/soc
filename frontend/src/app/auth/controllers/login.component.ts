import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {}
  
  login(form: NgForm): void {

    this.authService.auth_client(form);
    
  }
  
}