import { ICourse, Course } from '../course';

describe('Course', () => {
  let course: ICourse;

  beforeEach(() => {
    course = new Course('0', 'Video Course 0', 30, new Date('08.08.2018'), 'Test');
  });

  it('should return a duration', () => {
    expect(course.getDuration()).toBe('30min');

    course.duration = 60;
    expect(course.getDuration()).toBe('1h');

    course.duration = 90;
    expect(course.getDuration()).toBe('1h 30min');
  });
});
