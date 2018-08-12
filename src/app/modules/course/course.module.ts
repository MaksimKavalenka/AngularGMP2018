import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthorsComponent } from './components/authors/authors.component';
import { CourseComponent } from './components/course/course.component';
import { DateComponent } from './components/date/date.component';
import { DurationComponent } from './components/duration/duration.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ReleaseBorderDirective } from './directives/release-border/release-border.directive';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { SaveCoursePageComponent } from './pages/save-course-page/save-course-page.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { NodeCourseService } from './services/course/node-course.service';
import { MaterialModule } from '../../modules/material/material.module';
import { CustomRouterModule } from '../../modules/router/router.module';

@NgModule({
  declarations: [
    AuthorsComponent,
    CourseComponent,
    DateComponent,
    DurationComponent,
    PaginationComponent,
    ToolboxComponent,
    ReleaseBorderDirective,
    CoursesPageComponent,
    SaveCoursePageComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    CustomRouterModule,
  ],
  providers: [
    { provide: 'courseService', useClass: NodeCourseService },
  ],
})
export class CourseModule { }
