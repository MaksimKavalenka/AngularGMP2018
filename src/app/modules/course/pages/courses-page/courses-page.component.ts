import { Component, Inject, OnInit } from '@angular/core';
import { Sort } from '@angular/material';

import { Course } from '../../entities/course';
import { ICourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {

  private static readonly PAGE_COURSES_COUNT: number = 2;
  private static readonly PAGE_SORT: Sort = {
    active: 'creationDate',
    direction: 'desc',
  };

  public courses: Course[];
  public searchQuery: string;

  public constructor(
    @Inject('courseService') private courseService: ICourseService,
  ) {
    this.courses = [];
  }

  public ngOnInit() {
    this.getCourses();
  }

  public getCourses() {
    this.courseService.getCourses(this.courses.length, CoursesPageComponent.PAGE_COURSES_COUNT, CoursesPageComponent.PAGE_SORT)
      .subscribe(courses => this.courses = this.courses.concat(courses));
  }

  public deleteCourse(id: string) {
    this.courseService.deleteCourse(id)
      .subscribe(() => {
        console.log(`Course ${id} has been deleted`);
        this.courses = this.courses.filter(course => course.id !== id);
      });
  }

  public search(searchQuery: string) {
    console.log(`Search by ${searchQuery}`);
    this.searchQuery = searchQuery;
  }

  public loadMore() {
    console.log('Load more');
    this.getCourses();
  }

}
