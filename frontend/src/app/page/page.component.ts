import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

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
    private cookieService: CookieService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    var params = {
      guid: this.activateRoute['url']['value'][1].path,
      token: this.cookieService.get('_token')
    };
    this.authService.auth_client(params);
  }
}