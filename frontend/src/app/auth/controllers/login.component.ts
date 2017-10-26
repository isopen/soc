import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: '.login_form,.reg_form',
  templateUrl: '../views/login.component.html'
})
export class LoginComponent {
  
  results: string[];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {}
  
  login(): void {
    
    this.http.get('/api/items').subscribe(data => {
      this.results = data['results'];
    });
    
  }
  
}