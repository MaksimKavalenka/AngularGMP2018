import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { Course } from '../../entities/course';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { ICourseService } from '../../services/course/course.service';

const testCourses: Course[] = [
  new Course('1', 'Video Course 1', 31, new Date('01.08.2018'), 'Test1'),
  new Course('2', 'Video Course 2', 32, new Date('02.08.2018'), 'Test2'),
  new Course('3', 'Video Course 3', 33, new Date('03.08.2018'), 'Test3'),
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
      deleteCourse: jasmine.createSpy('deleteCourse').and.returnValue([testCourseCategory['delete']]),
      getCourse: jasmine.createSpy('getCourse').and.returnValue(testCourseCategory['get']),
      getCourses: jasmine.createSpy('getCourses').and.returnValue(testCourses),
    };

    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        OrderByPipe,
        SearchPipe,
      ],
      providers: [{ provide: 'memoryCourseService', useValue: spyCourseService }],
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
    expect(component.courses).toEqual([course]);
  });

  it('should apply a search query', () => {
    component.search(testSearchQuery);
    expect(component.searchQuery).toBe(testSearchQuery);
  });

  it('should load more courses', () => {
    component.loadMore();
  });
});
