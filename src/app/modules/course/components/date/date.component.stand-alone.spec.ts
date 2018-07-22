import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DateComponent } from './date.component';

describe('DateComponent StandAlone', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a date', () => {
    const spyDateChange = spyOn(component.dateChange, 'emit');
    const newDate = '1000';
    component.date = newDate;

    expect(component.date).toBe(newDate);
    expect(spyDateChange).toHaveBeenCalledWith(newDate);
  });
});
