import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgXCableModule } from 'ngx-cable';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { NotModule } from './404/not.module';

import { ConfigService } from './app.config';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    NgXCableModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    PageModule,
    NotModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    CookieService,
    ConfigService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
