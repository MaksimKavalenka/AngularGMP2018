import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CoursesPageComponent } from './courses-page.component';
import { Course } from '../../entities/course';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { ICourseService } from '../../services/course/course.service';

const testCourses: Course[] = [
  new Course({
    id: '1',
    title: 'Video Course 1',
    duration: 31,
    creationDate: new Date('01.08.2018'),
    description: 'Test1',
  }),
  new Course({
    id: '2',
    title: 'Video Course 2',
    duration: 32,
    creationDate: new Date('02.08.2018'),
    description: 'Test2',
  }),
  new Course({
    id: '3',
    title: 'Video Course 3',
    duration: 33,
    creationDate: new Date('03.08.2018'),
    description: 'Test3',
  }),
];

const testCourseCategory: Object = {
  get: testCourses[0],
  delete: testCourses[1],
};

const testSearchQuery = 'Course 1';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  let spyCourseService: Partial<ICourseService>;

  beforeEach(async(() => {
    spyCourseService = {
      getCourse: jasmine.createSpy('getCourse').and.returnValue(of(testCourseCategory['get'])),
      getCourses: jasmine.createSpy('getCourses').and.returnValue(of(testCourses)),
      deleteCourse: jasmine.createSpy('deleteCourse').and.returnValue(of([testCourseCategory['delete']])),
    };

    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        OrderByPipe,
        SearchPipe,
      ],
      providers: [{ provide: 'courseService', useValue: spyCourseService }],
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
    const course: Course = testCourseCategory['delete'];
    component.deleteCourse(course.id);

    expect(spyCourseService.deleteCourse).toHaveBeenCalledWith(course.id);
  });

  it('should apply a search query', () => {
    component.search(testSearchQuery);
    expect(component.searchQuery).toBe(testSearchQuery);
  });

  it('should load more courses', () => {
    component.loadMore();
  });
});
