import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourseService } from '../../services/course/course.service';
import { Path } from '../../../router/constants/path';
import { Course } from '../../entities/course';
import { EventService } from '../../../../services/event.service';

@Component({
  selector: 'app-save-course-page',
  templateUrl: './save-course-page.component.html',
  styleUrls: ['./save-course-page.component.css'],
})
export class SaveCoursePageComponent implements OnInit {

  public id: string;
  public title: string;
  public description: string;
  public date: string; // TODO: Add a validation
  public duration: number;
  public authors: string;
  public topRated: boolean;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    @Inject('courseService') private courseService: ICourseService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.courseService.getCourse(params.id)
          .subscribe((course) => {
            this.eventService.pushData({ title: course.title });
            this.id = params.id;
            this.title = course.title;
            this.description = course.description;
            this.date = course.creationDate.toString();
            this.duration = course.duration;
            this.authors = 'Unknown';
            this.topRated = course.topRated;
          });
      }
    });
  }

  public saveCourse() {
    if (this.id) {
      const course: Course = new Course(this.id, this.title, this.duration, new Date(this.date), this.description, this.topRated);
      this.courseService.updateCourse(this.id, course)
        .subscribe(() => this.router.navigate([`/${Path.COURSES}`]));
    } else {
      this.courseService.addCourse(this.title, this.duration, new Date(this.date), this.description)
        .subscribe(() => this.router.navigate([`/${Path.COURSES}`]));
    }
  }

  public isFormValid(): boolean {
    return !!this.title && !!this.description && !!this.date && this.duration && !!this.authors;
  }

}
