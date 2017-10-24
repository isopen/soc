import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Ng2CableModule } from 'ng2-cable';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2CableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
