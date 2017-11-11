import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from './auth.service'

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.redirect_to_user_page();
  }
}