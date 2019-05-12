import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  pure: false
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const updatedAtTS: number = new Date(value).getTime();
    const currentTS: number = new Date().getTime();

    // Find the distance between now and the count down date
    const diff: number = currentTS - updatedAtTS;
    return this.dhms(diff);
  }

  private dhms(distance: number) {
    // Time calculations for days, hours, minutes and seconds
    const days: number = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

    return days > 0 ? `${days} days ago` : hours > 0 ? `${hours} hours ago` : minutes > 0 ? `${minutes} min ago` : `${seconds} sec ago`;
  }
}
