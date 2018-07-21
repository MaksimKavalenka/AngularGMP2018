import { Course } from '../../entities/course';

export interface ICourseService {
  addCourse(courses: Course): void;
  addCourses(courses: Course[]): void;
  getCourse(id: string): Course;
  getCourses(): Course[];
  updateCourse(id: string, courses: Course): void;
  deleteCourse(id: string): Course[];
  deleteCourses(): void;
}
