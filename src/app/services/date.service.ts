import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {
  }

  getCurrentDate(format: string = 'DD-MM-YYYY'): String {
    return moment().format(format);
  }
}
