import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: '.login_form',
  templateUrl: '../views/login.component.html'
})
export class LoginComponent {
 
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {}
  
  login(form: NgForm): void {
    
    console.log(form);
    var params = {
      login: form.value.login,
      password: form.value.password
    };
    this.http.post('http://localhost:3000/login', params)
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