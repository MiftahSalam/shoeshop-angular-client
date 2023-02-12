import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'momentDate',
})
export class MomentDatePipe implements PipeTransform {
  transform(value: Date, format: string): string {
    return moment(value).format(format);
  }
}
