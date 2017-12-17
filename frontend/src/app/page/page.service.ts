import { Injectable } from '@angular/core';

import { ConfigService } from '../app.config';

@Injectable()
export class PageService {

  public page_id = '';

  constructor(
    private config: ConfigService
  ) {}

  public open_page_subscriptions() {

    const guid = localStorage.getItem('_guid'),
          token = localStorage.getItem('_token');

    this.config.broadcaster.on(this.config.main_channel)
      .subscribe(
        response => {
          console.log(response);
        }
      );

    this.config.ngcable.setCable(
      this.config.back_ws_host + '/?guid=' + guid + '&token=' + token
    );

    const params = {
      channel: this.config.main_channel,
      room: guid
    };

    this.config.ngcable.create(params);

    if (this.page_id !== guid) {
      params['channel'] = this.config.main_channel;
      params['room'] = this.page_id;
      this.config.ngcable.create(params);
    }

  }

}
