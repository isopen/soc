import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public back_host = 'http://localhost:3000';
  public back_ws_host = 'ws://localhost:28080';
  public main_channel = 'PageChannel';
}
