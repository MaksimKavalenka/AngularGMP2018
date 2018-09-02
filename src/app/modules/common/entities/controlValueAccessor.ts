import { HostListener } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class DefaultControlValueAccessor implements ControlValueAccessor {

  public onChange: Function;
  public onTouched: Function;

  public _value: any | any[];

  public get value(): any | any[] {
    return this._value;
  }

  public set value(value: any | any[]) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  public writeValue(value: any | any[]): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: any | any[]) => void): void {
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
