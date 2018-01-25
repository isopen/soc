import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgXCableModule } from 'ngx-cable';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    AppRoutingModule,
    AuthModule,
    PageModule,
    NotModule,
    ServiceWorkerModule.register('assets/soc-worker.js'),
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
    ConfigService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
