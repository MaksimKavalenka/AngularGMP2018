import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public date: string; // TODO: Add a validation
  public duration: number;
  public authors: string;
  public isTopRated: boolean;

  public durationErrors: any;

  public courseFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
  });

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
          this.courseFormGroup.setValue({
            title: course.course.title,
            description: course.course.description,
          });
          this.id = course.course.id;
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
        title: this.courseFormGroup.get('title').value,
        duration: this.duration,
        creationDate: new Date(this.date),
        description: this.courseFormGroup.get('description').value,
        isTopRated: this.isTopRated,
      });

      this.store.dispatch(new UpdateCourse(this.id, course));
    } else {
      this.store.dispatch(new AddCourse(
        this.courseFormGroup.get('title').value, this.duration, new Date(this.date), this.courseFormGroup.get('description').value,
      ));
    }
  }

  public isFormValid(): boolean {
    return true;
  }

}
