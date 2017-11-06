import { Component } from '@angular/core';

@Component({
  selector: '.menu_page',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  
  toggle_dropdown_menu = true;
  hamburder_icon_box = 'hamburder_icon_box';
  
  toggle_menu(): void {
    if(this.hamburder_icon_box == 'hamburder_icon_box') {
      this.toggle_dropdown_menu = false;
      this.hamburder_icon_box = 'hamburder_icon_box open';
    }else {
      this.toggle_dropdown_menu = true;
      this.hamburder_icon_box = 'hamburder_icon_box';
    }
  }
}