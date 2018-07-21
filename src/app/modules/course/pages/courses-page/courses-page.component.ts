import { Component, Inject, OnInit } from '@angular/core';

import { Course } from '../../entities/course';
import { ICourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {

  public courses: Course[];
  public searchQuery: string;
  public isEmplyList: boolean;

  public constructor(
    @Inject('memoryCourseService') private courseService: ICourseService,
  ) {
    this.courses = [];
  }

  public ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

  public deleteCourse(id: string) {
    this.courses = this.courseService.deleteCourse(id);
    console.log(`Course ${id} has been deleted`);
  }

  public search(searchQuery: string) {
    this.searchQuery = searchQuery;
    console.log(`Search by ${searchQuery}`);
  }

  public loadMore() {
    console.log('Load more');
  }

}
