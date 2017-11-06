import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  
  private host = 'http://localhost:3000';
  
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    private router: Router
  ) {}
  
  auth_client(params: Object): void {
    
    this.http.post(this.host + '/login', params)
    .subscribe(
      responce => {
        console.log(responce);
        switch(responce['type']) {
          case "login_by_pass":
            this.cookieService.set('_guid', responce['id']['$oid']);
            this.cookieService.set('_login', params['login']);
            this.cookieService.set('_token', responce['token']);
          break;
          case "login_error":
            this.cookieService.delete('_guid');
            this.cookieService.delete('_login');
            this.cookieService.delete('_token');
          break;
        };
        if(params['fl_auth_page'] == true) {
          this.router.navigateByUrl('/page/' + responce['id']['$oid']);
        }
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
        params['fl_auth_page'] = true;
        this.auth_client(params);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  
}