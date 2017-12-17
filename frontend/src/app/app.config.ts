import { Injectable } from '@angular/core';

import { NgXCable, Broadcaster } from 'ngx-cable';

@Injectable()
export class ConfigService {
  public back_host = 'http://localhost:3000';
  public back_ws_host = 'ws://localhost:28080';
  public main_channel = 'PageChannel';
  constructor(
    public ngcable: NgXCable,
    public broadcaster: Broadcaster
  ) {}
}
