import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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
  public id: string;
  public title: string;
  public description: string;
  public date: string; // TODO: Add a validation
  public duration: number;
  public authors: string;
  public isTopRated: boolean;

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
          this.id = course.course.id;
          this.title = course.course.title;
          this.description = course.course.description;
          this.date = course.course.creationDate.toString();
          this.duration = course.course.duration;
          this.authors = 'Unknown';
          this.isTopRated = course.course.isTopRated;
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
    if (this.id) {
      const course: Course = new Course({
        id: this.id,
        title: this.title,
        duration: this.duration,
        creationDate: new Date(this.date),
        description: this.description,
        isTopRated: this.isTopRated,
      });

      this.store.dispatch(new UpdateCourse(this.id, course));
    } else {
      this.store.dispatch(new AddCourse(this.title, this.duration, new Date(this.date), this.description));
    }
  }

  public isFormValid(): boolean {
    return !!this.title && !!this.description && !!this.date && this.duration && !!this.authors;
  }

}
