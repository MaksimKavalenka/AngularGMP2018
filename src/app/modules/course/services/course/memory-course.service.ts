import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ICourseService } from './course.service';
import { Course } from '../../entities/course';
import { GuidUtils } from '../../../../utils/guid-utils';

@Injectable()
export class MemoryCourseService implements ICourseService {

  private courses: Course[] = [
    new Course({
      id: '1',
      title: 'Video Course 1',
      duration: 88,
      creationDate: new Date('05.23.2018'),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      topRated: true,
    }),
    new Course({
      id: '2',
      title: 'Video Course 2',
      duration: 27,
      creationDate: new Date('06.10.2018'),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }),
    new Course({
      id: '3',
      title: 'Video Course 3',
      duration: 70,
      creationDate: new Date('07.14.2018'),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }),
    new Course({
      id: '4',
      title: 'Video Course 4',
      duration: 46,
      creationDate: new Date('07.08.2018'),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      topRated: true,
    }),
    new Course({
      id: '5',
      title: 'Video Course 5',
      duration: 30,
      creationDate: new Date('08.21.2018'),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }),
  ];

  public addCourse(title: string, duration: number, creationDate: Date, description: string, topRated?: boolean): Observable<Course> {
    const course: Course = new Course({ title, duration, creationDate, description, topRated, id: GuidUtils.guid() });
    this.courses.push(course);
    return of(course);
  }

  public addCourses(courses: Course[]): Observable<Course[]> {
    this.courses = this.courses.concat(courses);
    return of(this.courses);
  }

  public getCourse(id: string): Observable<Course> {
    const courseResult: Course = this.courses.find(course => course.id === id);
    return of(courseResult);
  }

  public getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  public updateCourse(id: string, course: Course): Observable<Course> {
    course.id = id;
    this.deleteCourse(id);
    this.courses.push(course);
    return of(course);
  }

  public deleteCourse(id: string): Observable<Course> {
    this.courses = this.courses.filter(course => course.id !== id);
    return of();
  }

  public deleteCourses(): Observable<Course> {
    this.courses = [];
    return of();
  }

}
