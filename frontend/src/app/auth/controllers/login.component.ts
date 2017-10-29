import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: '.login_form',
  templateUrl: '../views/login.component.html'
})
export class LoginComponent {
 
  constructor(private http: HttpClient, private cookieService: CookieService) {}
 
  ngOnInit(): void {}
  
  login(form: NgForm): void {

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
    this.http.post('http://localhost:3000/login', params)
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
  
}