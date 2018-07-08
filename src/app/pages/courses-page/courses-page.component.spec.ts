import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { ICourse, Course } from '../../entities/course';
import { MemoryCourseService } from '../../services/course-service/MemoryCourseService';

const testCourses: ICourse[] = [
  new Course('1', 'Video Course 1', 31, new Date('01.08.2018'), 'Test1'),
  new Course('2', 'Video Course 2', 32, new Date('02.08.2018'), 'Test2'),
  new Course('3', 'Video Course 3', 33, new Date('03.08.2018'), 'Test3'),
];

const testCourseCategory: Object = {
  get: testCourses[0],
  delete: testCourses[1],
};

const testSearchQuery = 'Test search query';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let courseService: Partial<MemoryCourseService>;

  beforeEach(async(() => {
    courseService = {
      deleteCourse: jasmine.createSpy('deleteCourse').and.returnValue([testCourseCategory['delete']]),
      getCourse: jasmine.createSpy('getCourse').and.returnValue(testCourseCategory['get']),
      getCourses: jasmine.createSpy('getCourses').and.returnValue(testCourses),
    };

    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      providers: [{ provide: MemoryCourseService, useValue: courseService }],
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
    expect(component.courses).toEqual(testCourses);
  });

  it('should delete a course', () => {
    const course: ICourse = testCourseCategory['delete'];

    component.deleteCourse(course.id);

    expect(courseService.deleteCourse).toHaveBeenCalledWith(course.id);
    expect(component.courses).toEqual([course]);
  });

  it('should delete a course when searching', () => {
    const deleteCourse: ICourse = testCourseCategory['delete'];
    const searchCourse: ICourse = testCourseCategory['search'];

    component.searchQuery = testSearchQuery;
    component.deleteCourse(deleteCourse.id);

    expect(courseService.deleteCourse).toHaveBeenCalledWith(deleteCourse.id);
    expect(component.courses).toEqual([searchCourse]);
  });

  it('should apply a search query', () => {
    const course: ICourse = testCourseCategory['search'];
    component.search(testSearchQuery);
    expect(component.courses).toEqual([course]);
  });

  it('should load more courses', () => {
    component.loadMore();
  });
});
