import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {
  }

  // TODO:: planing. can be moved to a separate class and improved
  public static get_counts_of_digits(d: number): number {
    return d.toString().length;
  }

  public static ref_format_of_digits(d: number): string | number {
    return UtilsService.get_counts_of_digits(d) === 1 ? ('0' + d) : d;
  }

  public static date_time_format(timestamp): string {
    const dt = new Date(parseInt(timestamp.toString(), 10)),
          hours: string | number = UtilsService.ref_format_of_digits(dt.getHours()),
          minutes: string | number = UtilsService.ref_format_of_digits(dt.getMinutes()),
          seconds: string | number = UtilsService.ref_format_of_digits(dt.getSeconds());
    return hours + ':' + minutes + ':' + seconds;
  }
}
