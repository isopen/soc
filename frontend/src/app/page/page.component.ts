import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { PageService } from './page.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private pageService: PageService,
    private activateRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    const params = {
      guid: localStorage.getItem('_guid'),
      token: localStorage.getItem('_token')
    };
    this.authService.auth_client(params).then(
      success => {
        this.pageService.page_id = this.activateRoute['url']['value'][1].path;
        this.pageService.open_page_subscriptions();
      },
      error => {}
    );
  }
}
