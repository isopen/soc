import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ConfigService } from '../app.config';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  private set_session(id: string, token: string): void {
    localStorage.setItem('_guid', id);
    localStorage.setItem('_token', token);
  }

  private remove_session(): Promise<{}> {
    return new Promise((resolve, reject) => {
      const params = {
        guid: localStorage.getItem('_guid'),
        token: localStorage.getItem('_token')
      };
      this.http.post(this.config.back_host + '/rem', params)
        .subscribe(
          response => {
            localStorage.removeItem('_guid');
            localStorage.removeItem('_token');
            resolve();
          },
          error => {
            reject();
          }
        );
    });
  }

  auth_client(params: Object): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.back_host + '/login', params)
        .subscribe(
          response => {
            console.log(response);
            switch (response['type']) {
              case 'login_by_pass':
                this.set_session(response['id']['$oid'], response['token']);
                if (params['fl_auth_page'] === true) {
                  this.router.navigateByUrl('/page/' + response['id']['$oid']);
                }
                resolve();
                break;
              case 'login_by_token':
                if (params['fl_auth_page'] === true) {
                  this.router.navigateByUrl('/page/' + response['id']['$oid']);
                }
                resolve();
                break;
              case 'login_error':
                this.remove_session();
                reject();
                break;
            }
          },
          error => {
            reject();
            console.log(error);
          }
        );
    });
  }

  reg_client(form: NgForm): void {
    const params = {
      login: form.value.login,
      password: form.value.password,
      re_password: form.value.re_password
    };
    this.http.post(this.config.back_host + '/reg', params)
    .subscribe(
      response => {
        console.log(response);
        switch (response['type']) {
          case 'reg_success':
            this.set_session(response['id']['$oid'], response['token']);
            delete params.login;
            delete params.password;
            params['guid'] = response['id']['$oid'];
            params['token'] = response['token'];
            params['fl_auth_page'] = true;
            this.auth_client(params);
          break;
          case 'reg_error':
          break;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  redirect_to_user_page(): void {
    if (localStorage.getItem('_guid') && localStorage.getItem('_token')) {
      this.router.navigateByUrl('/page/' + localStorage.getItem('_guid'));
    }
  }

  exit_client(): void {
    this.remove_session().then(
      response => {
        this.config.broadcaster.off();
        this.config.ngcable.disconnect();
        this.router.navigateByUrl('/');
      }
    );
  }

}
