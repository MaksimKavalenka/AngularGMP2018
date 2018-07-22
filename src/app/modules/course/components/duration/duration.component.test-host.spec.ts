import { Component } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DurationComponent } from './duration.component';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

@Component({
  template:
    `<app-duration [(duration)]="duration"></app-duration>`,
})
class TestHostComponent {
  public duration: number;
}

describe('DurationComponent TestHost', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DurationComponent,
        TestHostComponent,
        DurationPipe,
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
    const newDuration = 140;
    const durationElement = fixture.debugElement.query(By.css('#duration')).nativeElement;

    durationElement.value = newDuration;
    durationElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.duration).toBe(newDuration);
    expect(durationElement.value).toBe(newDuration.toString());
  }));

  it('should set a date', fakeAsync(() => {
    const newDuration = 140;
    component.duration = newDuration;

    fixture.detectChanges();
    tick();

    const durationElement = fixture.debugElement.query(By.css('#duration')).nativeElement;
    expect(component.duration).toBe(newDuration);
    expect(durationElement.value).toBe(newDuration.toString());
  }));
});
