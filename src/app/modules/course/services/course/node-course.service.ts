import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material';
import { Observable, Observer, BehaviorSubject } from 'rxjs';

import { ICourseService } from './course.service';
import { Course } from '../../entities/course';
import { JsonServerURL } from '../../../../common/constants';
import { GuidUtils } from '../../../../utils/guid-utils';
import { RxJsUtils } from '../../../../utils/rxjs-utils';

@Injectable()
export class NodeCourseService implements ICourseService {

  public loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean>;

  public constructor(
    private http: HttpClient,
  ) {
    this.loaderObservable = this.loaderSubject.asObservable();
  }

  public addCourse(title: string, duration: number, creationDate: Date, description: string, isTopRated?: boolean): Observable<Course> {
    const course: Course = new Course({ title, duration, creationDate, description, isTopRated, id: GuidUtils.guid() });
    const observable = this.http.post<Course>(JsonServerURL.COURSES, course);
    const handlerFunc = response => response;
    return RxJsUtils.createObservable<Course, Course>(observable, handlerFunc, this.loaderSubject);
  }

  public addCourses(courses: Course[]): Observable<Course[]> {
    const observable = this.http.post<Course[]>(JsonServerURL.COURSES, courses);
    const handlerFunc = response => response;
    return RxJsUtils.createObservable<Course[], Course[]>(observable, handlerFunc, this.loaderSubject);
  }

  public getCourse(id: string): Observable<Course> {
    const observable = this.http.get<Course>(`${JsonServerURL.COURSES}/${id}`);
    const handlerFunc = response => new Course(response);
    return RxJsUtils.createObservable<Course, Course>(observable, handlerFunc, this.loaderSubject);
  }

  public getCourses(start: number, limit: number, searchQuery?: string, sort?: Sort): Observable<Course[]> {
    let url = `${JsonServerURL.COURSES}?start=${start}&limit=${limit}`;
    if (searchQuery) {
      url += `&textFragment=${searchQuery}`;
    }
    if (sort) {
      url += `&sort=${sort.active}&order=${sort.direction}`;
    }

    const observable = this.http.get<Course[]>(url);
    const handlerFunc = response => response.map(course => new Course(course));
    return RxJsUtils.createObservable<Course[], Course[]>(observable, handlerFunc, this.loaderSubject);
  }

  public getAllCourses(): Observable<Course[]> {
    const observable = this.http.get<Course[]>(JsonServerURL.COURSES);
    const handlerFunc = response => response.map(course => new Course(course));
    return RxJsUtils.createObservable<Course[], Course[]>(observable, handlerFunc, this.loaderSubject);
  }

  public updateCourse(id: string, course: Course): Observable<Course> {
    const observable = this.http.put<Course>(`${JsonServerURL.COURSES}/${id}`, course);
    const handlerFunc = response => response;
    return RxJsUtils.createObservable<Course, Course>(observable, handlerFunc, this.loaderSubject);
  }

  public deleteCourse(id: string): Observable<void> {
    const observable = this.http.delete<void>(`${JsonServerURL.COURSES}/${id}`);
    const handlerFunc = () => null;
    return RxJsUtils.createObservable<void, void>(observable, handlerFunc, this.loaderSubject);
  }

  public deleteCourses(): Observable<void> {
    const observable = this.http.delete<void>(JsonServerURL.COURSES);
    const handlerFunc = () => null;
    return RxJsUtils.createObservable<void, void>(observable, handlerFunc, this.loaderSubject);
  }

}
