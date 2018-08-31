import { Sort } from '@angular/material';
import { Action } from '@ngrx/store';

import { Course } from '../entities/course';

export enum CourseActionTypes {
  ADD_COURSE = '[Course] Add Course',
  ADD_COURSE_SUCCESS = '[Course] Add Course Success',
  UPDATE_COURSE = '[Course] Update Course',
  UPDATE_COURSE_SUCCESS = '[Course] Update Course Success',
  GET_COURSE = '[Course] Get Course',
  GET_COURSE_SUCCESS = '[Course] Get Course Success',
  GET_COURSES = '[Course] Get Courses',
  GET_COURSES_SUCCESS = '[Course] Get Courses Success',
  DELETE_COURSE = '[Course] Delete Course',
  DELETE_COURSE_SUCCESS = '[Course] Delete Course Success',
}

export class AddCourse implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.ADD_COURSE;

  public constructor(
    public title: string,
    public duration: number,
    public creationDate: Date,
    public description: string,
    public isTopRated?: boolean,
  ) { }
}

export class AddCourseSuccess implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.ADD_COURSE_SUCCESS;
}

export class UpdateCourse implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.UPDATE_COURSE;

  public constructor(
    public id: string,
    public course: Course,
  ) { }
}

export class UpdateCourseSuccess implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.UPDATE_COURSE_SUCCESS;
}

export class GetCourse implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.GET_COURSE;

  public constructor(
    public id: string,
  ) { }
}

export class GetCourseSuccess implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.GET_COURSE_SUCCESS;

  public constructor(
    public course: Course,
  ) { }
}

export class GetCourses implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.GET_COURSES;

  public constructor(
    public start: number,
    public limit: number,
    public searchQuery?: string,
    public sort?: Sort,
    public isSearchable?: boolean,
  ) { }
}

export class GetCoursesSuccess implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.GET_COURSES_SUCCESS;

  public constructor(
    public isSearchable: boolean,
    public courses: Course[],
  ) { }
}

export class DeleteCourse implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.DELETE_COURSE;

  public constructor(
    public id: string,
  ) { }
}

export class DeleteCourseSuccess implements Action {
  public readonly type: CourseActionTypes = CourseActionTypes.DELETE_COURSE_SUCCESS;

  public constructor(
    public id: string,
  ) { }
}

export type CourseActions =
  | AddCourse
  | AddCourseSuccess
  | UpdateCourse
  | UpdateCourseSuccess
  | GetCourses
  | GetCourseSuccess
  | GetCourses
  | GetCoursesSuccess
  | DeleteCourse
  | DeleteCourseSuccess;
