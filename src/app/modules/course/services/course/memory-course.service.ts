import { Injectable } from '@angular/core';

import { ICourseService } from './course.service';
import { Course } from '../../entities/course';
import { GuidUtils } from '../../../../utils/guid-utils';

@Injectable()
export class MemoryCourseService implements ICourseService {

  private courses: Course[] = [
    new Course(
      '1', 'Video Course 1', 88, new Date('05.23.2018'),
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      true,
    ),
    new Course(
      '2', 'Video Course 2', 27, new Date('06.10.2018'),
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    ),
    new Course(
      '3', 'Video Course 3', 70, new Date('07.14.2018'),
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    ),
    new Course(
      '4', 'Video Course 4', 46, new Date('07.08.2018'),
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      true,
    ),
    new Course(
      '5', 'Video Course 5', 30, new Date('08.21.2018'),
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    ),
  ];

  public addCourse(title: string, duration: number, creationDate: Date, description: string, topRated?: boolean): Course {
    const course: Course = new Course(GuidUtils.guid(), title, duration, creationDate, description, topRated);
    this.courses.push(course);
    return course;
  }

  public addCourses(courses: Course[]): void {
    this.courses = this.courses.concat(courses);
  }

  public getCourse(id: string): Course {
    return this.courses.find(course => course.id === id);
  }

  public getCourses(): Course[] {
    return this.courses;
  }

  public updateCourse(id: string, course: Course): void {
    course.id = id;
    this.deleteCourse(id);
    this.courses.push(course);
  }

  public deleteCourse(id: string): Course[] {
    this.courses = this.courses.filter(course => course.id !== id);
    return this.courses;
  }

  public deleteCourses(): void {
    this.courses = [];
  }

}
