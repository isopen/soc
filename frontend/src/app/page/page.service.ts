import { Injectable } from '@angular/core';

import { NgXCable, Broadcaster } from 'ngx-cable';

import { ConfigService } from '../app.config';

@Injectable()
export class PageService {

  public user_id = '';
  public page_id = '';
  public user_subscriptions = [];

  constructor(
    private config: ConfigService,
    private ngcable: NgXCable,
    private broadcaster: Broadcaster
  ) {}

  public open_page_subscriptions() {

    const guid = localStorage.getItem('_guid'),
          token = localStorage.getItem('_token');

    this.broadcaster.on(this.config.main_channel)
      .subscribe(
        response => {
          console.log(response);
        }
      );

    this.ngcable.setCable(
      this.config.back_ws_host + '/?guid=' + guid + '&token=' + token
    );

    const params = {
      channel: this.config.main_channel,
      room: guid
    };

    this.ngcable.create(params);

    if (this.page_id !== guid) {
      params['channel'] = this.config.main_channel;
      params['room'] = this.page_id;
      this.ngcable.create(params);
    }
  }

}
