import { Component, OnInit } from '@angular/core';
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
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    // TODO:: ???
    const params = {
      guid: this.activateRoute['url']['value'][1].path,
      token: localStorage.getItem('_token')
    };
    this.authService.auth_client(params);
  }
}
