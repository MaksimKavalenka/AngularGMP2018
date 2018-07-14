import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogComponent } from '../dialog/dialog.component';
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

  public constructor(
    private dialog: MatDialog,
  ) { }

  public deleteCourse(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { course: this.course },
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
