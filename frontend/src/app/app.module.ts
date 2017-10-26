import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Ng2CableModule } from 'ng2-cable';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/controllers/login.component';

@NgModule({
  imports: [
    BrowserModule,
    Ng2CableModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }
