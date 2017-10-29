import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: '.reg_form',
  templateUrl: '../views/reg.component.html'
})
export class RegComponent {
  
  results: string[];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {}
  
  reg(form: NgForm): void {
    
    var params = {
      login: form.value.login,
      password: form.value.password
    };
    this.http.post('http://localhost:3000/reg', params)
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