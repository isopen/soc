import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { PageComponent } from './page.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    PageComponent,
    PhotoComponent
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    PageComponent
  ]
})
export class PageModule { }