import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { NotComponent } from './not.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    NotComponent
  ],
  bootstrap: [
    NotComponent
  ]
})
export class NotModule { }
