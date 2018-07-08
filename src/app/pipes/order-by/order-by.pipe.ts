import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from '../../entities/course';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  public transform(courses: ICourse[], field: string, order: number): any {
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
