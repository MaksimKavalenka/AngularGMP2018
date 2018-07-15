import { Course } from '../../entities/course';

export interface ICourseService {
  addCourse(courses: Course): void;
  addCourses(courses: Course[]): void;
  getCourses(): Course[];
  getCourse(id: string): Course;
  updateCourse(id: string, courses: Course): void;
  deleteCourse(id: string): Course[];
}
