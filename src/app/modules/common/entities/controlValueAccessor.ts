import { HostListener } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class DefaultControlValueAccessor implements ControlValueAccessor {

  public onChange: Function;
  public onTouched: Function;

  public _value: number;

  public get value(): number {
    return this._value;
  }

  public set value(duration: number) {
    this._value = duration;
    if (this.onChange) {
      this.onChange(duration);
    }
  }

  public writeValue(duration: number): void {
    this.value = duration;
  }

  public registerOnChange(fn: (duration: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('click')
  public click(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  public change(event: any): void {
    this.value = event.target.value;
  }

}
