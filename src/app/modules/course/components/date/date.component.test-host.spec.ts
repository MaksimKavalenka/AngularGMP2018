import { Component } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DateComponent } from './date.component';

@Component({
  template:
    `<app-date [(date)]="date"></app-date>`,
})
class TestHostComponent {
  public date: string;
}

describe('DateComponent TestHost', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateComponent,
        TestHostComponent,
      ],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a date', fakeAsync(() => {
    const newDate = '1000';
    const dateElement = fixture.debugElement.query(By.css('#date')).nativeElement;

    dateElement.value = newDate;
    dateElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.date).toBe(newDate);
    expect(dateElement.value).toBe(newDate);
  }));

  it('should set a date', fakeAsync(() => {
    const newDate = '1000';
    component.date = newDate;

    fixture.detectChanges();
    tick();

    const dateElement = fixture.debugElement.query(By.css('#date')).nativeElement;
    expect(component.date).toBe(newDate);
    expect(dateElement.value).toBe(newDate);
  }));
});
