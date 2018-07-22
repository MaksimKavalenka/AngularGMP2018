import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent {

  private dateValue: string; // TODO: Shouldn't it be of a Date type?

  @Output()
  public dateChange: EventEmitter<string> = new EventEmitter();

  @Input()
  public get date(): string {
    return this.dateValue;
  }

  public set date(date: string) {
    this.dateValue = date;
    this.dateChange.emit(this.dateValue);
  }

}
