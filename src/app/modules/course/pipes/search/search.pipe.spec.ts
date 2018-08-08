import { SearchPipe } from './search.pipe';
import { Course } from '../../entities/course';

const testCourses: Course[] = [
  new Course({
    id: '3',
    title: 'Video Course 3',
    duration: 33,
    creationDate: new Date(),
    description: 'Test3',
  }),
  new Course({
    id: '1',
    title: 'Video Course 1',
    duration: 31,
    creationDate: new Date(),
    description: 'Test1',
  }),
  new Course({
    id: '2',
    title: 'Video Course 2',
    duration: 32,
    creationDate: new Date(0),
    description: 'Test2',
  }),
  new Course({
    id: '4',
    title: 'Video Course 1',
    duration: 34,
    creationDate: new Date(),
    description: 'Test4',
  }),
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
