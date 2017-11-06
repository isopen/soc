import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './page.component.html',
  providers: [
    AuthService
  ]
})
export class PageComponent {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
}