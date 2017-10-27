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
    
    console.log(form);
    this.http.get('/api/items').subscribe(data => {
      this.results = data['results'];
    });
    
  }
  
}