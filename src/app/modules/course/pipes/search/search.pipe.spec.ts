import { SearchPipe } from './search.pipe';
import { Course } from '../../entities/course';

const testCourses: Course[] = [
  new Course('3', 'Video Course 3', 33, new Date(), 'Test3'),
  new Course('1', 'Video Course 1', 31, new Date(), 'Test1'),
  new Course('2', 'Video Course 2', 32, new Date(0), 'Test2'),
  new Course('4', 'Video Course 1', 34, new Date(), 'Test4'),
];

describe('SearchPipe', () => {
  const pipe = new SearchPipe();

  it('searches for courses', () => {
    let courses: Course[] = pipe.transform(testCourses, 'title', 'Course 1');
    expect(courses.length).toBe(2);

    courses = pipe.transform(testCourses, 'creationDate', new Date(0).toString());
    expect(courses.length).toBe(1);
  });

});
