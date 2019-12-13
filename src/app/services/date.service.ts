import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {
  }

  getCurrentDate(format: string = 'YYYY-MM-DD'): string {
    return moment().format(format);
  }
}
