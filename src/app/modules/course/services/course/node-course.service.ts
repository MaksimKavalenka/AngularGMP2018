import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';

import { ICourseService } from './course.service';
import { Author } from '../../entities/author';
import { Course } from '../../entities/course';
import { GuidUtils } from '../../../../utils/guid-utils';
import { RxJsUtils } from '../../../../utils/rxjs-utils';

@Injectable()
export class NodeCourseService implements ICourseService {

  private static readonly COURSES_URL = 'http://localhost:3004/courses';

  public loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean>;

  public constructor(
    private http: HttpClient,
  ) {
    this.loaderObservable = this.loaderSubject.asObservable();
  }

  public addCourse(
    title: string, duration: number, creationDate: Date, description: string, authors: Author[], isTopRated?: boolean,
  ): Observable<Course> {
    const course: Course = new Course({ title, duration, creationDate, description, authors, isTopRated, id: GuidUtils.guid() });
    const observable = this.http.post<Course>(NodeCourseService.COURSES_URL, course);
    const handlerFunc = response => response;
    return RxJsUtils.createObservable<Course, Course>(observable, handlerFunc, this.loaderSubject);
  }

  public addCourses(courses: Course[]): Observable<Course[]> {
    const observable = this.http.post<Course[]>(NodeCourseService.COURSES_URL, courses);
    const handlerFunc = response => response;
    return RxJsUtils.createObservable<Course[], Course[]>(observable, handlerFunc, this.loaderSubject);
  }

  public getCourse(id: string): Observable<Course> {
    const observable = this.http.get<Course>(`${NodeCourseService.COURSES_URL}/${id}`);
    const handlerFunc = response => new Course(response);
    return RxJsUtils.createObservable<Course, Course>(observable, handlerFunc, this.loaderSubject);
  }

  public getCourses(start: number, limit: number, searchQuery?: string, sort?: Sort): Observable<Course[]> {
    let url = `${NodeCourseService.COURSES_URL}?start=${start}&limit=${limit}`;
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
    const observable = this.http.get<Course[]>(NodeCourseService.COURSES_URL);
    const handlerFunc = response => response.map(course => new Course(course));
    return RxJsUtils.createObservable<Course[], Course[]>(observable, handlerFunc, this.loaderSubject);
  }

  public updateCourse(id: string, course: Course): Observable<Course> {
    const observable = this.http.put<Course>(`${NodeCourseService.COURSES_URL}/${id}`, course);
    const handlerFunc = response => response;
    return RxJsUtils.createObservable<Course, Course>(observable, handlerFunc, this.loaderSubject);
  }

  public deleteCourse(id: string): Observable<void> {
    const observable = this.http.delete<void>(`${NodeCourseService.COURSES_URL}/${id}`);
    const handlerFunc = () => null;
    return RxJsUtils.createObservable<void, void>(observable, handlerFunc, this.loaderSubject);
  }

  public deleteCourses(): Observable<void> {
    const observable = this.http.delete<void>(NodeCourseService.COURSES_URL);
    const handlerFunc = () => null;
    return RxJsUtils.createObservable<void, void>(observable, handlerFunc, this.loaderSubject);
  }

}
