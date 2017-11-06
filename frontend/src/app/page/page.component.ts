import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './page.component.html',
  providers: [
    AuthService
  ]
})
export class PageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    var params = {
      guid: this.cookieService.get('_guid'),
      token: this.cookieService.get('_token')
    };
    this.authService.auth_client(params);
  }
}