import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}