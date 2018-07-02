import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseComponent } from './course.component';
import { ICourse, Course } from '../../entities/course';

const testCourse: ICourse = new Course('0', 'Video Course 0', 30, new Date('08.08.2018'), 'Test');

@Component({
  template:
    `<app-course [course]="course" (deleteCourseEvent)="deleteCourse($event)"></app-course>`,
})
class TestHostComponent {
  public course: ICourse = testCourse;
  public id: string;

  public deleteCourse(id: string) {
    this.id = id;
  }
}

describe('CourseComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, TestHostComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have appropriate course information', () => {
    expect(component.course.creationDate).toEqual(testCourse.creationDate);
    expect(component.course.description).toEqual(testCourse.description);
    expect(component.course.duration).toEqual(testCourse.duration);
    expect(component.course.id).toEqual(testCourse.id);
    expect(component.course.title).toEqual(testCourse.title);
  });

  it('should delete a course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(component.id).toEqual(testCourse.id);
  });
});
