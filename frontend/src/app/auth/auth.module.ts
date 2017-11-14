import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './controllers/login.component';
import { RegComponent } from './controllers/reg.component';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegComponent
  ],
  providers: [
    CookieService,
    AuthService
  ],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule { }
