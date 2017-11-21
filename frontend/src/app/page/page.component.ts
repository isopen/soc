import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { PageService } from './page.service';

@Component({
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private pageService: PageService
  ) {}
  ngOnInit() {
    /* this.activateRoute['url']['value'][1].path,*/
    const params = {
      guid: localStorage.getItem('_guid'),
      token: localStorage.getItem('_token')
    };
    this.authService.auth_client(params).then(
      success => {
        this.pageService.open_page_channel();
      },
      error => {}
    );
  }
}
