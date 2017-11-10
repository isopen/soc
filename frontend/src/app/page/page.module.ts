import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { PageComponent } from './page.component';
import { PhotoComponent } from './photo/photo.component';
import { MenuComponent } from './menu/menu.component';
import { WallComponent } from './wall/wall.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    PageComponent,
    PhotoComponent,
    MenuComponent,
    WallComponent
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    PageComponent
  ]
})
export class PageModule { }