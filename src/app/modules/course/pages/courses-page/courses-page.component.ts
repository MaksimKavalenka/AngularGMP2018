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

  public constructor(
    @Inject('courseService') private courseService: ICourseService,
  ) {
    this.courses = [];
  }

  public ngOnInit() {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  public deleteCourse(id: string) {
    this.courseService.deleteCourse(id)
      .subscribe(() => {
        console.log(`Course ${id} has been deleted`);
        this.courseService.getCourses()
          .subscribe(courses => this.courses = courses);
      });
  }

  public search(searchQuery: string) {
    this.searchQuery = searchQuery;
    console.log(`Search by ${searchQuery}`);
  }

  public loadMore() {
    console.log('Load more');
  }

}
