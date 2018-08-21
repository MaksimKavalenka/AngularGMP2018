import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Course } from '../../entities/course';
import { GetCourses, DeleteCourse } from '../../actions/course.actions';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  private static readonly PAGE_COURSES_COUNT: number = 5;
  private static readonly PAGE_SORT: Sort = {
    active: 'creationDate',
    direction: 'desc',
  };

  private courseStore: Subscription;
  public courses: Course[];
  public searchQuery: string;

  public constructor(
    private store: Store<any>,
  ) {
    this.courses = [];
  }

  public ngOnInit() {
    this.courseStore = this.store.select('course').subscribe(
      course => this.courses = course.courses,
    );

    this.getCourses();
  }

  public ngOnDestroy() {
    this.courseStore.unsubscribe();
  }

  public getCourses(isSearchable: boolean = false) {
    this.store.dispatch(new GetCourses(
      isSearchable ? 0 : this.courses.length, CoursesPageComponent.PAGE_COURSES_COUNT,
      this.searchQuery, CoursesPageComponent.PAGE_SORT, isSearchable,
    ));
  }

  public deleteCourse(id: string) {
    this.store.dispatch(new DeleteCourse(id));
  }

  public search(searchQuery: string) {
    console.log(`Search by ${searchQuery}`);
    this.searchQuery = searchQuery;
    this.getCourses(true);
  }

  public loadMore() {
    console.log('Load more');
    this.getCourses();
  }

}
