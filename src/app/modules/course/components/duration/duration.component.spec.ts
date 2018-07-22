import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DurationComponent } from './duration.component';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

describe('DurationComponent', () => {
  let component: DurationComponent;
  let fixture: ComponentFixture<DurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DurationComponent,
        DurationPipe,
      ],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
