import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AddCourse, UpdateCourse, GetCourse } from '../../actions/course.actions';
import { Course } from '../../entities/course';
import { EventService } from '../../../../modules/common/services/event/event.service';

@Component({
  selector: 'app-save-course-page',
  templateUrl: './save-course-page.component.html',
  styleUrls: ['./save-course-page.component.css'],
})
export class SaveCoursePageComponent implements OnInit, OnDestroy {

  private courseStore: Subscription;

  public dateFormat = 'DD/MM/YYYY';
  public course: any = {};

  public constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this.courseStore = this.store.select('course').subscribe(
      (course) => {
        if (course.course) {
          this.eventService.pushData({ title: course.course.title });
          this.course.id = course.course.id;
          this.course.title = course.course.title;
          this.course.description = course.course.description;
          this.course.date = moment(course.course.creationDate).format(this.dateFormat);
          this.course.duration = course.course.duration;
          this.course.authors = course.course.authors;
          this.course.isTopRated = course.course.isTopRated;
        }
      },
    );

    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.store.dispatch(new GetCourse(params.id));
      }
    });
  }

  public ngOnDestroy() {
    this.courseStore.unsubscribe();
  }

  public saveCourse() {
    if (this.course.id) {
      const course: Course = new Course({
        id: this.course.id,
        title: this.course.title,
        description: this.course.description,
        duration: this.course.duration,
        creationDate: new Date(this.course.date),
        authors: this.course.authors,
        isTopRated: this.course.isTopRated,
      });

      this.store.dispatch(new UpdateCourse(this.course.id, course));
    } else {
      this.store.dispatch(new AddCourse(
        this.course.title, this.course.duration, new Date(this.course.date), this.course.description, this.course.authors,
      ));
    }
  }

}
