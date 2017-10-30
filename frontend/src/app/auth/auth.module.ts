import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './controllers/login.component';
import { RegComponent } from './controllers/reg.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegComponent
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule { }