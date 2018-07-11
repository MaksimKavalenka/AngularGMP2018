import { OrderByPipe } from './order-by.pipe';
import { ICourse, Course } from '../../entities/course';

const testCourses: ICourse[] = [
  new Course('3', 'Video Course 3', 33, new Date(), 'Test3'),
  new Course('1', 'Video Course 1', 31, new Date(), 'Test1'),
  new Course('2', 'Video Course 2', 32, new Date(0), 'Test2'),
  new Course('4', 'Video Course 1', 34, new Date(), 'Test4'),
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
