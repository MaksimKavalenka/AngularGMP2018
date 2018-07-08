import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICourse } from '../../entities/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {

  @Input()
  public course: ICourse;

  @Output()
  public deleteCourseEvent: EventEmitter<string> = new EventEmitter();

  public constructor() { }

  public deleteCourse(id: string) {
    this.deleteCourseEvent.emit(id);
  }

}
