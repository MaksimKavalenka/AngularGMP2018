import { Observable } from 'rxjs';

import { Course } from '../../entities/course';

export interface ICourseService {
  addCourse(title: string, duration: number, creationDate: Date, description: string, topRated?: boolean): Observable<Course>;
  addCourses(courses: Course[]): Observable<Course[]>;
  getCourse(id: string): Observable<Course>;
  getCourses(): Observable<Course[]>;
  updateCourse(id: string, course: Course): Observable<Course>;
  deleteCourse(id: string): Observable<Course>;
  deleteCourses(): Observable<Course>;
}
