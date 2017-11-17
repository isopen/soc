import { Injectable } from '@angular/core';

import { Ng2Cable, Broadcaster } from 'ng2-cable';

import { ConfigService } from '../app.config';

@Injectable()
export class PageService {

  constructor(
    private config: ConfigService,
    private ng2cable: Ng2Cable,
    private broadcaster: Broadcaster
  ) {}

  public open_page_channel() {
    const params = {
      guid: localStorage.getItem('_guid'),
      token: localStorage.getItem('_token')
    };
    this.broadcaster.on<string>('ChatChannel')
      .subscribe(
        response => {
          console.log(response);
        }
      );
    this.ng2cable.subscribe(
      this.config.back_ws_host + '/?guid=' + params['guid'] + '&token=' + params['token'],
      'ChatChannel',
      params
    );
  }

}
