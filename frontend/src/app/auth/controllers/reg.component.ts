import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: '.reg_form',
  templateUrl: '../views/reg.component.html'
})
export class RegComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  reg(form: NgForm): void {

    this.authService.reg_client(form);

  }

}
