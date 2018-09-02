import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap, switchMap } from 'rxjs/operators';

import {
  CourseActionTypes,
  AddCourse,
  UpdateCourse,
  GetCourse,
  GetCourseSuccess,
  GetCourses,
  GetCoursesSuccess,
  DeleteCourse,
  DeleteCourseSuccess,
  AddCourseSuccess,
  UpdateCourseSuccess,
} from '../actions/course.actions';
import { ICourseService } from '../services/course/course.service';
import { Path } from '../../router/constants/path';

@Injectable()
export class CourseEffects {

  public constructor(
    private actions$: Actions,
    private router: Router,
    @Inject('courseService') private courseService: ICourseService,
  ) { }

  @Effect()
  addCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.ADD_COURSE),
    switchMap((action: AddCourse) => {
      return this.courseService.addCourse(
        action.title, action.duration, action.creationDate, action.description, action.authors, action.isTopRated,
      ).pipe(
        map(() => new AddCourseSuccess()),
        tap(() => this.router.navigate([`/${Path.COURSES}`])),
      );
    }),
  );

  @Effect()
  updateCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.UPDATE_COURSE),
    switchMap((action: UpdateCourse) => {
      return this.courseService.updateCourse(action.id, action.course).pipe(
        map(() => new UpdateCourseSuccess()),
        tap(() => this.router.navigate([`/${Path.COURSES}`])),
      );
    }),
  );

  @Effect()
  getCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.GET_COURSE),
    switchMap((action: GetCourse) => {
      return this.courseService.getCourse(action.id).pipe(
        map(course => new GetCourseSuccess(course)),
      );
    }),
  );

  @Effect()
  getCourses$ = this.actions$.pipe(
    ofType(CourseActionTypes.GET_COURSES),
    switchMap((action: GetCourses) => {
      return this.courseService.getCourses(action.start, action.limit, action.searchQuery, action.sort).pipe(
        map(courses => new GetCoursesSuccess(action.isSearchable, courses)),
      );
    }),
  );

  @Effect()
  deleteCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.DELETE_COURSE),
    switchMap((action: DeleteCourse) => {
      return this.courseService.deleteCourse(action.id).pipe(
        map(() => new DeleteCourseSuccess(action.id)),
      );
    }),
  );

}
