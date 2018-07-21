import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogComponent } from '../../../../modules/material/components/dialog/dialog.component';
import { Course } from '../../entities/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {

  @Input()
  public course: Course;

  @Output()
  public deleteCourseEvent: EventEmitter<string> = new EventEmitter();

  public constructor(
    private dialog: MatDialog,
  ) { }

  public deleteCourse() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Do you really want to delete this course?',
        item: this.course.title,
      },
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCourseEvent.emit(this.course.id);
      }
    });
  }

}
