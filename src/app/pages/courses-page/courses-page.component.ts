import { Component, OnInit } from '@angular/core';

import { ICourse, Course } from '../../entities/course';
import { CourseService } from '../../services/CourseService';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {

  private static readonly SEARCH_QUERY_FIELDS: string[] = ['title', 'description', 'creationDate'];

  private courses: ICourse[];
  private searchQuery: string;

  public constructor(
    public courseService: CourseService,
  ) {
    this.courses = [];
  }

  public ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

  public deleteCourse(id: string) {
    this.courses = this.courseService.deleteCourse(id);
    console.log(`Course ${id} has been deleted`);
    this.search(this.searchQuery);
  }

  public search(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.courses = this.courseService.search(searchQuery, CoursesPageComponent.SEARCH_QUERY_FIELDS);
    console.log(`Search by ${searchQuery}`);
  }

}
