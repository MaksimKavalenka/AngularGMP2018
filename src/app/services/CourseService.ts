import { Injectable } from '@angular/core';

import { ICourse, Course } from '../entities/course';

@Injectable()
export class CourseService {

  private cources: ICourse[] = [
    new Course(
      '1', 'Video Course 1', 88, new Date('05.23.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '2', 'Video Course 2', 27, new Date('06.10.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '3', 'Video Course 3', 70, new Date('07.14.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '4', 'Video Course 4', 46, new Date('07.16.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '5', 'Video Course 5', 30, new Date('08.21.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '5', 'Video Course 5', 30, new Date('08.21.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '5', 'Video Course 5', 30, new Date('08.21.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
    new Course(
      '5', 'Video Course 5', 30, new Date('08.21.2018'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ),
  ];

  public constructor() { }

  public getCourses(): ICourse[] {
    return this.cources;
  }

  public getCourse(id: string): ICourse {
    return this.cources.find(course => course.id === id);
  }

  public deleteCourse(id: string): ICourse[] {
    this.cources = this.cources.filter(course => course.id !== id);
    return this.cources;
  }

  public search(searchQuery: string, fields: string[]): ICourse[] {
    return searchQuery
      ? this.cources.filter(course => fields.some((field: string) => {
        const value: any = course[field];
        if (value instanceof Date) {
          return new Date(searchQuery).getTime() === value.getTime();
        }
        return new RegExp(searchQuery).test(value);
      }))
      : this.cources;
  }

}
