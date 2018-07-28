import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
})
export class DurationComponent {

  private durationValue: number;

  @Output()
  public durationChange: EventEmitter<number> = new EventEmitter();

  @Input()
  public get duration(): number {
    return this.durationValue;
  }

  public set duration(duration: number) {
    this.durationValue = duration;
    this.durationChange.emit(this.durationValue);
  }

}
