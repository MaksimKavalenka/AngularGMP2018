import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material';
import { Observable, Observer } from 'rxjs';

import { ICourseService } from './course.service';
import { Course } from '../../entities/course';
import { JsonServerURL } from '../../../../common/constants';
import { GuidUtils } from '../../../../utils/guid-utils';

@Injectable()
export class NodeCourseService implements ICourseService {

  public constructor(
    private http: HttpClient,
  ) { }

  public addCourse(title: string, duration: number, creationDate: Date, description: string, isTopRated?: boolean): Observable<Course> {
    const course: Course = new Course({ title, duration, creationDate, description, isTopRated, id: GuidUtils.guid() });
    return this.http.post<Course>(JsonServerURL.COURSES, course);
  }

  public addCourses(courses: Course[]): Observable<Course[]> {
    return this.http.post<Course[]>(JsonServerURL.COURSES, courses);
  }

  public getCourse(id: string): Observable<Course> {
    let _observer: Observer<Course>;
    const observable = new Observable<Course>((observer) => {
      _observer = observer;
      _getCourse();
    });

    const _getCourse = () => {
      this.http.get<Course>(`${JsonServerURL.COURSES}/${id}`).subscribe(
        (course) => {
          const modCourse: Course = (new Course(course));
          _observer.next(modCourse);
        },
        err => _observer.error(err),
      );
    };

    return observable;
  }

  public getCourses(start: number, limit: number, searchQuery?: string, sort?: Sort): Observable<Course[]> {
    let _observer: Observer<Course[]>;
    const observable = new Observable<Course[]>((observer) => {
      _observer = observer;
      _getCourses();
    });

    let url = `${JsonServerURL.COURSES}?start=${start}&limit=${limit}`;

    if (searchQuery) {
      url += `&textFragment=${searchQuery}`;
    }

    if (sort) {
      url += `&sort=${sort.active}&order=${sort.direction}`;
    }

    const _getCourses = () => {
      this.http.get<Course[]>(url).subscribe(
        (courses) => {
          const modCourses: Course[] = courses.map(course => new Course(course));
          _observer.next(modCourses);
        },
        err => _observer.error(err),
      );
    };

    return observable;
  }

  public getAllCourses(): Observable<Course[]> {
    let _observer: Observer<Course[]>;
    const observable = new Observable<Course[]>((observer) => {
      _observer = observer;
      _getAllCourses();
    });

    const _getAllCourses = () => {
      this.http.get<Course[]>(JsonServerURL.COURSES).subscribe(
        (courses) => {
          const modCourses: Course[] = courses.map(course => new Course(course));
          _observer.next(modCourses);
        },
        err => _observer.error(err),
      );
    };

    return observable;
  }

  public updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${JsonServerURL.COURSES}/${id}`, course);
  }

  public deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${JsonServerURL.COURSES}/${id}`);
  }

  public deleteCourses(): Observable<void> {
    return this.http.delete<void>(JsonServerURL.COURSES);
  }

}
