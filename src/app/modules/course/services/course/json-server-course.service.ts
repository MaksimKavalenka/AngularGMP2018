import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICourseService } from './course.service';
import { Course } from '../../entities/course';
import { JsonServerURL } from '../../../../common/constants';
import { GuidUtils } from '../../../../utils/guid-utils';

@Injectable()
export class JsonServerCourseService implements ICourseService {

  public constructor(
    private http: HttpClient,
  ) { }

  public addCourse(title: string, duration: number, creationDate: Date, description: string, topRated?: boolean): Observable<Course> {
    const course: Course = new Course(GuidUtils.guid(), title, duration, creationDate, description, topRated);
    return this.http.post<Course>(JsonServerURL.COURSES, course);
  }

  public addCourses(courses: Course[]): Observable<Course[]> {
    return this.http.post<Course[]>(JsonServerURL.COURSES, courses);
  }

  public getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${JsonServerURL.COURSES}/${id}`);
  }

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(JsonServerURL.COURSES);
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
