import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Ng2CableModule } from 'ng2-cable';
import { AppRoutingModule } from './app-routing.module';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { NotModule } from './404/not.module';

import { ConfigService } from './app.config';

@NgModule({
  imports: [
    BrowserModule,
    Ng2CableModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    PageModule,
    NotModule
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
