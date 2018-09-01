import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationComponent),
    multi: true,
  }],
})
export class DurationComponent implements ControlValueAccessor {

  private _duration: number;

  public get duration(): number {
    return this._duration;
  }

  public set duration(duration: number) {
    this._duration = duration;
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
