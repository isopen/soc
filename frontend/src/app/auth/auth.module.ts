import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './controllers/login.component';
import {RegComponent} from './controllers/reg.component';
import {AuthService} from './auth.service';

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
    AuthComponent,
    LoginComponent,
    RegComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule {
}
