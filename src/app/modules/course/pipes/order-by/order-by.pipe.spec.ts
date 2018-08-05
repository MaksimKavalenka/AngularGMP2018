import { OrderByPipe } from './order-by.pipe';
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

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  it('orders courses', () => {
    pipe.transform(testCourses, 'title', 1);
    expect(testCourses[0].title).toEqual('Video Course 1');
    expect(testCourses[1].title).toEqual('Video Course 1');
    expect(testCourses[2].title).toEqual('Video Course 2');
    expect(testCourses[3].title).toEqual('Video Course 3');
  });

});
