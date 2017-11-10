import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {
    if(this.cookieService.check("_guid") && this.cookieService.check("_token")) {
      this.router.navigateByUrl('/page/' + this.cookieService.get("_guid"));
    }
  }
}