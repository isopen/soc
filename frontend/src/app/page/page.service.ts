import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../app.config';

@Injectable()
export class PageService {

  public page_id = '';

  constructor(
    private router: Router,
    private config: ConfigService
  ) {}

  public open_page_subscriptions() {

    const guid = localStorage.getItem('_guid'),
          token = localStorage.getItem('_token');

    this.config.ngcable.connect(
      this.config.back_ws_host + '/?guid=' + guid + '&token=' + token
    );

    const params = {
      channel: this.config.main_channel,
      room: guid
    };

    this.config.ngcable.subscribe(params);

    if (this.page_id !== guid) {
      params['channel'] = this.config.main_channel;
      params['room'] = this.page_id;
      this.config.ngcable.subscribe(params);
    }

  }

  public send(action, data): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (this.config.ngcable.perform(action, data)) {
        resolve();
      }else {
        reject();
      }
    });
  }

  public transition_to_wall(guid: string): void {
    this.router.navigateByUrl('/page/' + guid).then(
      () => {
        // TODO:: reloading modules relative to guid
      }
    );
  }

}
