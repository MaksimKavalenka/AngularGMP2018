import { ICourse, Course } from '../../../entities/course';
import { ICourseService } from '../course.service';
import { MemoryCourseService } from '../memory-course.service';

describe('MemoryCourseService', () => {
  const courseService: ICourseService = new MemoryCourseService();
  const testCourses: ICourse[] = [];

  beforeAll(() => {
    for (let i = 0; i < 3; i += 1) {
      testCourses.push(new Course(i.toString(), `Video Course ${i}`, 30 + i, new Date(`${i}.08.2018`), `Test${i}`));
    }
  });

  beforeEach(() => {
    courseService.addCourses(testCourses);
  });

  it('should get courses', () => {
    expect(courseService.getCourses()).toBe(testCourses);
  });

  it('should get a course', () => {
    const course: ICourse = testCourses[0];
    expect(courseService.getCourse(course.id)).toEqual(course);
  });

  it('should delete a course', () => {
    const course: ICourse = testCourses[0];
    expect(courseService.deleteCourse(course.id).length).toBe(testCourses.length - 1);
    expect(courseService.getCourse(course.id)).toBeUndefined();
  });
});
