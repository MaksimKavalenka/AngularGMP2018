import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { ReleaseBorderDirective } from '../../directives/release-border/release-border.directive';
import { Course } from '../../entities/course';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

const testCourse: Course = new Course('0', 'Video Course 0', 30, new Date('08.08.2018'), 'Test');

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, ReleaseBorderDirective, DurationPipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = testCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have appropriate course information', () => {
    expect(component.course.creationDate).toBe(testCourse.creationDate);
    expect(component.course.description).toBe(testCourse.description);
    expect(component.course.duration).toBe(testCourse.duration);
    expect(component.course.id).toBe(testCourse.id);
    expect(component.course.title).toBe(testCourse.title);
    expect(component.course.topRated).toBe(testCourse.topRated);
  });
});
