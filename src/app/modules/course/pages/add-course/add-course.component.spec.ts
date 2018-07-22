import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AddCourseComponent } from './add-course.component';
import { Course } from '../../entities/course';
import { ICourseService } from '../../services/course/course.service';
import { Path } from '../../../../modules/router/constants/path';

const testCourse: Course = new Course('1', 'Video Course 1', 31, new Date('01.08.2018'), 'Test1');

@Component({
  template: '',
})
class MockComponent { }

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  let spyCourseService: Partial<ICourseService>;

  beforeEach(async(() => {
    spyCourseService = {
      addCourse: jasmine.createSpy('addCourse').and.returnValue(testCourse),
    };

    TestBed.configureTestingModule({
      declarations: [
        AddCourseComponent,
        MockComponent,
      ],
      imports: [
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          { path: Path.COURSES, component: MockComponent },
        ]),
      ],
      providers: [{ provide: 'memoryCourseService', useValue: spyCourseService }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a course', fakeAsync(() => {
    const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement;
    const descriptionInput = fixture.debugElement.query(By.css('#description')).nativeElement;
    const addCourseButton = fixture.debugElement.query(By.css('.submit'));

    component.date = testCourse.creationDate.toString();
    component.duration = testCourse.duration;
    component.authors = 'New Author';

    titleInput.value = testCourse.title;
    titleInput.dispatchEvent(new Event('input'));

    descriptionInput.value = testCourse.description;
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    addCourseButton.triggerEventHandler('click', null);

    expect(component.isFormValid()).toBeTruthy();
    expect(spyCourseService.addCourse).toHaveBeenCalledWith(
      testCourse.title, testCourse.duration, new Date(testCourse.creationDate.toString()), testCourse.description,
    );
  }));

  it('should validate a form', fakeAsync(() => {
    const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement;

    titleInput.value = testCourse.title;
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.isFormValid()).toBeFalsy();
  }));
});
