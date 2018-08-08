import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CourseComponent } from './course.component';
import { ReleaseBorderDirective } from '../../directives/release-border/release-border.directive';
import { Course } from '../../entities/course';
import { DurationPipe } from '../../pipes/duration/duration.pipe';
import { DialogComponent } from '../../../material/components/dialog/dialog.component';
import { Path } from '../../../router/constants/path';
import { MaterialModule } from '../../../../modules/material/material.module';

const testCourse: Course = new Course({
  id: '0',
  title: 'Video Course 0',
  duration: 30,
  creationDate: new Date('08.08.2018'),
  description: 'Test',
});

@Component({
  template: '',
})
class MockComponent { }

@Component({
  template:
    `<app-course [course]="course" (deleteCourseEvent)="deleteCourse($event)"></app-course>`,
})
class TestHostComponent {
  public course: Course = testCourse;
  public id: string;

  public deleteCourse(id: string) {
    this.id = id;
  }
}

describe('CourseComponent TestHost', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let spyMatDialog: Partial<MatDialog>;
  let spyMatDialogRef: Partial<MatDialogRef<DialogComponent, any>>;

  beforeEach(async(() => {
    spyMatDialogRef = {
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of(true)),
    };

    spyMatDialog = {
      open: jasmine.createSpy('open').and.returnValue(spyMatDialogRef),
    };

    TestBed.configureTestingModule({
      declarations: [
        CourseComponent,
        ReleaseBorderDirective,
        DurationPipe,
        MockComponent,
        TestHostComponent,
      ],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes([
          { path: Path.COURSES, component: MockComponent },
        ]),
      ],
      providers: [{ provide: MatDialog, useValue: spyMatDialog }],
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

  it('should update a course', () => {
    const newCourse: Course = new Course({
      id: '1',
      title: 'Video Course 1',
      duration: 31,
      creationDate: new Date('01.08.2018'),
      description: 'Test1',
    });

    component.course = newCourse;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('#title')).nativeElement;
    expect(titleElement.textContent).toBe(newCourse.title.toUpperCase());

    const descriptionElement = fixture.debugElement.query(By.css('#description')).nativeElement;
    expect(descriptionElement.textContent).toBe(newCourse.description);

    const durationElement = fixture.debugElement.query(By.css('#duration')).nativeElement;
    expect(durationElement.textContent).toBe(new DurationPipe().transform(newCourse.duration));

    const creationDateElement = fixture.debugElement.query(By.css('#creationDate')).nativeElement;
    expect(creationDateElement.textContent).toBe(new DatePipe('en-US').transform(newCourse.creationDate, 'MM.dd.y'));
  });

  it('should delete a course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.id).toBe(testCourse.id);
  });
});
