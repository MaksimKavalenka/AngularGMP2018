import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CourseService } from '../../services/CourseService';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let courseService: Partial<CourseService>;

  beforeEach(async(() => {
    courseService = {
      deleteCourse: jasmine.createSpy('deleteCourse'),
      getCourse: jasmine.createSpy('getCourse'),
      getCourses: jasmine.createSpy('getCourses'),
      search: jasmine.createSpy('search'),
    };

    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      providers: [{ provide: CourseService, useValue: courseService }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
