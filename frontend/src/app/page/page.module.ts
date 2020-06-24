import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PageComponent} from './page.component';
import {PhotoComponent} from './photo/photo.component';
import {MenuComponent} from './menu/menu.component';
import {WallComponent} from './wall/wall.component';
import {AuthService} from '../auth/auth.service';
import {PageService} from './page.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    PageComponent,
    PhotoComponent,
    MenuComponent,
    WallComponent
  ],
  providers: [
    AuthService,
    PageService
  ],
  bootstrap: [
    PageComponent
  ]
})
export class PageModule {
}
