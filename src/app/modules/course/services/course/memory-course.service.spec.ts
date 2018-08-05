import { ICourseService } from './course.service';
import { MemoryCourseService } from './memory-course.service';
import { Course } from '../../entities/course';

const testCourse: Course = new Course({
  id: '1',
  title: 'Video Course 1',
  duration: 31,
  creationDate: new Date('01.08.2018'),
  description: 'Test1',
});

describe('MemoryCourseService', () => {
  const courseService: ICourseService = new MemoryCourseService();

  let spyMemoryCourseService: Partial<MemoryCourseService>;

  beforeAll(() => {
    spyMemoryCourseService = {
      addCourse: spyOn(courseService, 'addCourse').and.callThrough(),
      addCourses: spyOn(courseService, 'addCourses').and.callThrough(),
      getCourse: spyOn(courseService, 'getCourse').and.callThrough(),
      getCourses: spyOn(courseService, 'getCourses').and.callThrough(),
      getAllCourses: spyOn(courseService, 'getAllCourses').and.callThrough(),
      updateCourse: spyOn(courseService, 'updateCourse').and.callThrough(),
      deleteCourse: spyOn(courseService, 'deleteCourse').and.callThrough(),
      deleteCourses: spyOn(courseService, 'deleteCourses').and.callThrough(),
    };
  });

  it('should add a course', () => {
    courseService.addCourse('Video Course 1', 31, new Date('01.08.2018'), 'Test1', true);
    expect(spyMemoryCourseService.addCourse).toHaveBeenCalled();
  });

  it('should add courses', () => {
    courseService.addCourses([testCourse]);
    expect(spyMemoryCourseService.addCourses).toHaveBeenCalledWith([testCourse]);
  });

  it('should get a course', () => {
    courseService.getCourse(testCourse.id);
    expect(spyMemoryCourseService.getCourse).toHaveBeenCalledWith(testCourse.id);
  });

  it('should get courses', () => {
    const start = 0;
    const limit = 5;

    courseService.getCourses(start, limit);
    expect(spyMemoryCourseService.getCourses).toHaveBeenCalledWith(start, limit);
  });

  it('should get all courses', () => {
    courseService.getAllCourses();
    expect(spyMemoryCourseService.getAllCourses).toHaveBeenCalled();
  });

  it('should update a course', () => {
    courseService.updateCourse(testCourse.id, testCourse);
    expect(spyMemoryCourseService.updateCourse).toHaveBeenCalledWith(testCourse.id, testCourse);
  });

  it('should delete a course', () => {
    courseService.deleteCourse(testCourse.id);
    expect(spyMemoryCourseService.deleteCourse).toHaveBeenCalledWith(testCourse.id);
  });

  it('should delete courses', () => {
    courseService.deleteCourses();
    expect(spyMemoryCourseService.deleteCourse).toHaveBeenCalled();
  });
});
