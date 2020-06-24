import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(
    private authService: AuthService
  ) {
    this.authService.redirect_to_user_page();
  }
}
