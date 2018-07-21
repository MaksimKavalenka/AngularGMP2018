import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CourseComponent } from './course.component';
import { ReleaseBorderDirective } from '../../directives/release-border/release-border.directive';
import { Course } from '../../entities/course';
import { DurationPipe } from '../../pipes/duration/duration.pipe';
import { DialogComponent } from '../../../material/components/dialog/dialog.component';
import { MaterialModule } from '../../../../modules/material/material.module';

const testCourse: Course = new Course('0', 'Video Course 0', 30, new Date('08.08.2018'), 'Test');

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
        TestHostComponent,
      ],
      imports: [MaterialModule],
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

  it('should delete a course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.id).toBe(testCourse.id);
  });
});
