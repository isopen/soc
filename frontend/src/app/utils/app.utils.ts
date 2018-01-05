import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {}
  /*
    date and time formatting function
    TODO:: rewrite function to format as in telegram
   */
  public static date_time_format(timestamp): string {
    return new Date(parseInt(timestamp.toString(), 10)).toString();
  }
}
