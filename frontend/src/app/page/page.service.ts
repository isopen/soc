import { Injectable } from '@angular/core';

import { Ng2Cable, Broadcaster } from 'ng2-cable';

import { ConfigService } from '../app.config';

@Injectable()
export class PageService {

  public user_id = '';
  public page_id = '';
  public user_subscriptions = [];

  constructor(
    private config: ConfigService,
    private ng2cable: Ng2Cable,
    private broadcaster: Broadcaster
  ) {}

  public open_page_subscriptions() {

    const guid = localStorage.getItem('_guid'),
          token = localStorage.getItem('_token');

    this.broadcaster.on<string>(this.config.main_channel)
      .subscribe(
        response => {
          console.log(response);
        }
      );

    this.ng2cable.setCable(
      this.config.back_ws_host + '/?guid=' + guid + '&token=' + token
    );

    const params = {
      channel: this.config.main_channel,
      room: guid
    };

    this.ng2cable.create(params);

    if (this.page_id !== guid) {
      params['channel'] = this.config.main_channel;
      params['room'] = this.page_id;
      this.ng2cable.create(params);
    }
  }

}
