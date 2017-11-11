import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ConfigService } from '../app.config';

@Injectable()
export class AuthService {
  
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    private router: Router,
    private config: ConfigService
  ) {}
  
  private set_session(id: string, token: string) {
    this.cookieService.set('_guid', id, null, '/');
    this.cookieService.set('_token', token, null, '/');
  }
  
  private remove_session() {
    this.cookieService.delete('_guid', '/');
    this.cookieService.delete('_token', '/');
  }
  
  auth_client(params: Object): void {
    
    this.http.post(this.config.back_host + '/login', params)
    .subscribe(
      response => {
        console.log(response);
        switch(response['type']) {
          case "login_by_pass":
            this.set_session(response['id']['$oid'], response['token']);
            if(params['fl_auth_page'] == true) {
              this.router.navigateByUrl('/page/' + response['id']['$oid']);
            }
          break;
          case "login_by_token":
            if(params['fl_auth_page'] == true) {
              this.router.navigateByUrl('/page/' + response['id']['$oid']);
            }
          break;
          case "login_error":
            this.remove_session();
          break;
        };
      },
      error => {
        console.log(error);
      }
    );  
  }
  
  reg_client(form: NgForm): void {
    var params = {
      login: form.value.login,
      password: form.value.password
    };
    this.http.post(this.config.back_host + '/reg', params)
    .subscribe(
      response => {
        console.log(response);
        switch(response['type']) {
          case "reg_by_loginpass":
            this.set_session(response['id']['$oid'], response['token']);
            var params = {
              guid: response['id']['$oid'],
              token: response['token'],
              fl_auth_page: true
            };
            this.auth_client(params);
          break;
          case "reg_error":
          break;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  
  exit_client(): void {
    this.remove_session();
    this.router.navigateByUrl('/');
  }
  
}