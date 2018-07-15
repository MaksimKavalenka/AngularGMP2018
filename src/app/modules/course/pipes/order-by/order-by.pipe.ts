import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../entities/course';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  public transform(courses: Course[], field: string, order: number): Course[] {
    return courses.sort((course1, course2) => {
      if (course1[field] > course2[field]) {
        return order;
      }
      if (course1[field] < course2[field]) {
        return -order;
      }
      return 0;
    });
  }

}
