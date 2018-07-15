import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseComponent } from './course.component';
import { ReleaseBorderDirective } from '../../directives/release-border/release-border.directive';
import { Course } from '../../entities/course';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

const testCourse: Course = new Course('0', 'Video Course 0', 30, new Date('08.08.2018'), 'Test');

describe('CourseComponent StandAlone', () => {
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

  it('should delete a course', () => {
    let deteleId: string;

    component.deleteCourseEvent.subscribe((id: string) => deteleId = id);

    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(deteleId).toBe(component.course.id);
  });
});
