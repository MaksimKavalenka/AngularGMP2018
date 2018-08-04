import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SaveCoursePageComponent } from './save-course-page.component';
import { Course } from '../../entities/course';
import { ICourseService } from '../../services/course/course.service';
import { Path } from '../../../../modules/router/constants/path';
import { EventService } from '../../../../services/event.service';

const testCourse: Course = new Course('1', 'Video Course 1', 31, new Date('01.08.2018'), 'Test1');

@Component({
  template: '',
})
class MockComponent { }

describe('SaveCoursePageComponent', () => {
  let component: SaveCoursePageComponent;
  let fixture: ComponentFixture<SaveCoursePageComponent>;

  let spyActivatedRoute: Partial<ActivatedRoute>;
  let spyEventService: Partial<EventService>;
  let spyCourseService: Partial<ICourseService>;

  beforeEach(async(() => {
    spyActivatedRoute = {
      params: of({ id: testCourse.id }),
    };

    spyEventService = {
      pushData: jasmine.createSpy('pushData'),
    };

    spyCourseService = {
      addCourse: jasmine.createSpy('saveCourse').and.returnValue(testCourse),
      getCourse: jasmine.createSpy('getCourse').and.returnValue(testCourse),
      updateCourse: jasmine.createSpy('updateCourse'),
    };

    TestBed.configureTestingModule({
      declarations: [
        SaveCoursePageComponent,
        MockComponent,
      ],
      imports: [
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          { path: Path.COURSES, component: MockComponent },
        ]),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: spyActivatedRoute },
        { provide: EventService, useValue: spyEventService },
        { provide: 'courseService', useValue: spyCourseService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(SaveCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init a component', (() => {
    expect(spyCourseService.getCourse).toHaveBeenCalledWith(testCourse.id);
    expect(spyEventService.pushData).toHaveBeenCalled();

    expect(component.id).toBe(testCourse.id);
    expect(component.title).toBe(testCourse.title);
    expect(component.description).toBe(testCourse.description);
    expect(component.date).toBe(testCourse.creationDate.toString());
    expect(component.duration).toBe(testCourse.duration);
    expect(component.topRated).toBe(testCourse.topRated);
  }));

  it('should update a course', fakeAsync(() => {
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
    expect(spyCourseService.updateCourse).toHaveBeenCalled();
  }));

  it('should validate a form', fakeAsync(() => {
    const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement;

    titleInput.value = '';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.isFormValid()).toBeFalsy();
  }));
});
