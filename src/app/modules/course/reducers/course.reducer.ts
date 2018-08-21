import { ActionReducer } from '@ngrx/store';

import { CourseActions, CourseActionTypes, GetCourseSuccess, GetCoursesSuccess, DeleteCourseSuccess } from '../actions/course.actions';

const defaultState: any = {
  courses: [],
};

export function courseReducer(state: any = defaultState, action: CourseActions): ActionReducer<any> {
  switch (action.type) {
    case CourseActionTypes.ADD_COURSE_SUCCESS:
    case CourseActionTypes.UPDATE_COURSE_SUCCESS:
      return defaultState;

    case CourseActionTypes.GET_COURSE_SUCCESS:
      return {
        ...state,
        course: (<GetCourseSuccess>action).course,
      };

    case CourseActionTypes.GET_COURSES_SUCCESS:
      if ((<GetCoursesSuccess>action).isSearchable) {
        state.courses = [];
      }

      return {
        ...state,
        courses: state.courses.concat((<GetCoursesSuccess>action).courses),
      };

    case CourseActionTypes.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== (<DeleteCourseSuccess>action).id),
      };

    default:
      return state;
  }
}
