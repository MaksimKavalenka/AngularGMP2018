import { Course } from '../../entities/course';

export interface ICourseService {
  addCourses(courses: Course[]): void;
  getCourses(): Course[];
  getCourse(id: string): Course;
  deleteCourse(id: string): Course[];
}
