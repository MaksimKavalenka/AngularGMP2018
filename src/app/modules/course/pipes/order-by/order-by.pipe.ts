import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../entities/course';
import { ArrayUtils } from '../../../../utils/array-utils';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  public transform(courses: Course[], field: string, order: number): Course[] {
    return ArrayUtils.sort(courses, field, order);
  }

}
