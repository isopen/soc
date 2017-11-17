import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { PageService } from './page.service';

@Component({
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private pageService: PageService
  ) {}
  ngOnInit() {
    const params = {
      guid: this.activateRoute['url']['value'][1].path,
      token: localStorage.getItem('_token')
    };
    this.authService.auth_client(params).then(
      success => {
        this.pageService.open_page_channel();
      }
    );
  }
}
