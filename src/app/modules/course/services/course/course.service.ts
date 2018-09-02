import { Sort } from '@angular/material';
import { Observable } from 'rxjs';

import { Author } from '../../entities/author';
import { Course } from '../../entities/course';
import { ILoaderService } from '../../../../services/loader/loader.service';

export interface ICourseService extends ILoaderService {
  addCourse(
    title: string, duration: number, creationDate: Date, description: string, authors: Author[], isTopRated?: boolean,
  ): Observable<Course>;
  addCourses(courses: Course[]): Observable<Course[]>;
  getCourse(id: string): Observable<Course>;
  getCourses(start: number, limit: number, searchQuery?: string, sort?: Sort): Observable<Course[]>;
  getAllCourses(): Observable<Course[]>;
  updateCourse(id: string, course: Course): Observable<Course>;
  deleteCourse(id: string): Observable<void>;
  deleteCourses(): Observable<void>;
}
