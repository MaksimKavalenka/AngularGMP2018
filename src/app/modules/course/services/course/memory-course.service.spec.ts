import { ICourseService } from './course.service';
import { MemoryCourseService } from './memory-course.service';
import { Course } from '../../entities/course';

describe('MemoryCourseService', () => {
  const courseService: ICourseService = new MemoryCourseService();
  const testCourses: Course[] = [];

  beforeAll(() => {
    for (let i = 0; i < 3; i += 1) {
      testCourses.push(new Course(i.toString(), `Video Course ${i}`, 30 + i, new Date(`${i}.08.2018`), `Test${i}`));
    }
  });

  beforeEach(() => {
    courseService.deleteCourses();
    courseService.addCourses(testCourses);
  });

  it('should add a course', () => {
    const course: Course = courseService.addCourse('Video Course 5', 35, new Date('5.08.2018'), 'Test5', true);
    expect(courseService.getCourse(course.id)).toEqual(course);
    expect(courseService.getCourses().length).toBe(testCourses.length + 1);
  });

  it('should add courses', () => {
    const testCoursesToAdd: Course[] = [];
    for (let i = 3; i < 5; i += 1) {
      testCoursesToAdd.push(new Course(i.toString(), `Video Course ${i}`, 30 + i, new Date(`${i}.08.2018`), `Test${i}`));
    }

    courseService.addCourses(testCoursesToAdd);
    expect(courseService.getCourses().length).toBe(testCourses.length + testCoursesToAdd.length);
  });

  it('should get a course', () => {
    const course: Course = testCourses[0];
    expect(courseService.getCourse(course.id)).toEqual(course);
  });

  it('should get courses', () => {
    expect(courseService.getCourses()).toEqual(testCourses);
  });

  it('should update a course', () => {
    const id: string = testCourses[0].id;
    const updatedCourse: Course = new Course('6', 'Video Course 6', 35, new Date('6.08.2018'), 'Test6');

    courseService.updateCourse(id, updatedCourse);
    expect(courseService.getCourse(updatedCourse.id)).toEqual(updatedCourse);
    expect(courseService.getCourses().length).toBe(testCourses.length);
  });

  it('should delete a course', () => {
    const course: Course = testCourses[0];

    courseService.deleteCourse(course.id);
    expect(courseService.getCourses().length).toBe(testCourses.length - 1);
    expect(courseService.getCourse(course.id)).toBeUndefined();
  });

  it('should delete courses', () => {
    courseService.deleteCourses();
    expect(courseService.getCourses().length).toBe(0);
  });
});
