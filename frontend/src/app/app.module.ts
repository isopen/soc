import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Ng2CableModule } from 'ng2-cable';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/controllers/login.component';
import { RegComponent } from './auth/controllers/reg.component';

@NgModule({
  imports: [
    BrowserModule,
    Ng2CableModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegComponent
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    LoginComponent,
    RegComponent
  ]
})
export class AppModule { }
