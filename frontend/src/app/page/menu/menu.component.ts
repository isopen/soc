import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: '.menu_page',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  
  toggle_dropdown_menu = true;
  hamburder_icon_box = 'hamburder_icon_box';
  
  constructor(
    private authService: AuthService
  ) {}
  
  toggle_menu(): void {
    if(this.hamburder_icon_box == 'hamburder_icon_box') {
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
  
}