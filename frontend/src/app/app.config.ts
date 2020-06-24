import {Injectable} from '@angular/core';

import {NgXCable, Broadcaster} from 'ngx-cable';
import * as zango from 'zangodb';

@Injectable()
export class ConfigService {

  public back_host = 'http://localhost:3000';
  public back_ws_host = 'ws://localhost:28080';
  public main_channel = 'PageChannel';

  private db = null;
  private db_config = {
    unsent_messages: ['action', 'data']
  };
  public unsent_messages = null;

  constructor(
    public ngcable: NgXCable,
    public broadcaster: Broadcaster
  ) {
    // this.db = new zango.Db('soc', 1.0, this.db_config);
    // this.unsent_messages = this.db.collection('unsent_messages');
  }
}
