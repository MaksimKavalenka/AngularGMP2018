import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationInputComponent),
    multi: true,
  }],
})
export class DurationInputComponent implements ControlValueAccessor {

  private durationValue = 0;

  @Output()
  public durationChange: EventEmitter<number> = new EventEmitter();

  @Input()
  public get duration(): number {
    return this.durationValue;
  }

  public set duration(duration: number) {
    this.durationValue = duration;
    this.durationChange.emit(this.duration);
  }

  public onChange(event: any): void {
    this.duration = event.target.value;
  }

  public onTouched(): void { }

  public writeValue(duration: number): void {
    this.duration = duration;
  }

  public registerOnChange(fn: (duration: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
