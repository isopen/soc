import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../app.config';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: '.menu_page',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  toggle_dropdown_menu = true;
  hamburder_icon_box = 'hamburder_icon_box';

  constructor(
    private router: Router,
    private authService: AuthService,
    private config: ConfigService
  ) {}

  toggle_menu(): void {
    if (this.hamburder_icon_box === 'hamburder_icon_box') {
      this.toggle_dropdown_menu = false;
      this.hamburder_icon_box = 'hamburder_icon_box open';
    }else {
      this.toggle_dropdown_menu = true;
      this.hamburder_icon_box = 'hamburder_icon_box';
    }
  }

  user_exit() {
    this.authService.exit_client();
  }

  user_home() {
    if (this.router.url.indexOf(localStorage.getItem('_guid')) === -1) {
      this.config.ngcable.disconnect();
      this.router.navigateByUrl('/');
    }else {
      this.toggle_menu();
    }
  }

}
