import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ICourseService } from '../../services/course/course.service';
import { Path } from '../../../router/constants/path';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {

  public title: string;
  public description: string;
  public date: string; // TODO: Add a validation
  public duration: number;
  public authors: string;

  public constructor(
    private router: Router,
    @Inject('memoryCourseService') private courseService: ICourseService,
  ) { }

  public addCourse() {
    this.courseService.addCourse(this.title, this.duration, new Date(this.date), this.description);
    this.router.navigate([`/${Path.COURSES}`]);
  }

  public isFormValid(): boolean {
    return !!this.title && !!this.description && !!this.date && this.duration && !!this.authors;
  }

}
