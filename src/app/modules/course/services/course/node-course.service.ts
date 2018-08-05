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
    const observable = new Observable<Course>(observer => _observer = observer);
    let _observer: Observer<Course>;

    this.http.get<Course>(`${JsonServerURL.COURSES}/${id}`)
      .subscribe((course) => {
        const modCourse: Course = (new Course(course));
        _observer.next(modCourse);
      });

    return observable;
  }

  public getCourses(start: number, limit: number, sort?: Sort): Observable<Course[]> {
    const observable = new Observable<Course[]>(observer => _observer = observer);
    let _observer: Observer<Course[]>;

    let url = `${JsonServerURL.COURSES}?start=${start}&limit=${limit}`;
    if (sort) {
      url += `&sort=${sort.active}&order=${sort.direction}`;
    }

    this.http.get<Course[]>(url)
      .subscribe((courses) => {
        const modCourses: Course[] = courses.map(course => new Course(course));
        _observer.next(modCourses);
      });

    return observable;
  }

  public getAllCourses(): Observable<Course[]> {
    const observable = new Observable<Course[]>(observer => _observer = observer);
    let _observer: Observer<Course[]>;

    this.http.get<Course[]>(JsonServerURL.COURSES)
      .subscribe((courses) => {
        const modCourses: Course[] = courses.map(course => new Course(course));
        _observer.next(modCourses);
      });

    return observable;
  }

  public updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${JsonServerURL.COURSES}/${id}`, course);
  }

  public deleteCourse(id: string): Observable<Course> {
    return this.http.delete<Course>(`${JsonServerURL.COURSES}/${id}`);
  }

  public deleteCourses(): Observable<Course> {
    return this.http.delete<Course>(JsonServerURL.COURSES);
  }

}
