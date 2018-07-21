import { ICourse } from '../../entities/course';

export interface ICourseService {
  addCourses(courses: ICourse[]): void;
  getCourses(): ICourse[];
  getCourse(id: string): ICourse;
  deleteCourse(id: string): ICourse[];
}
