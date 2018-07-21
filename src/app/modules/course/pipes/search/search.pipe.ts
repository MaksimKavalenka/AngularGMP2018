import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../entities/course';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(courses: Course[], field: string, searchQuery: string): Course[] {
    return searchQuery
      ? courses.filter((course) => {
        const value: any = course[field];
        if (value instanceof Date) {
          return new Date(searchQuery).getTime() === value.getTime();
        }
        return new RegExp(searchQuery.toLowerCase()).test(value.toLowerCase());
      })
      : courses;
  }

}
