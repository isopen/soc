import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  
  private host = 'http://localhost:3000';
  
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService
  ) {}
  
  auth_client(form: NgForm): void {
    var params = {},
        token = this.cookieService.get('_token');
    if(token) {
      params = {
        login: form.value.login,
        token: token
      };
    }else {
      params = {
        login: form.value.login,
        password: form.value.password
      };
    }
    this.http.post(this.host + '/login', params)
    .subscribe(
      responce => {
        console.log(responce);
        switch(responce['type']) {
          case "login_by_pass":
            this.cookieService.set('_token', responce["token"]);
          break;
          case "login_error":
            this.cookieService.delete('_token');
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
    this.http.post(this.host + '/reg', params)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  
}