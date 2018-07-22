import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthorsComponent } from './components/authors/authors.component';
import { CourseComponent } from './components/course/course.component';
import { DateComponent } from './components/date/date.component';
import { DurationComponent } from './components/duration/duration.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ReleaseBorderDirective } from './directives/release-border/release-border.directive';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { MemoryCourseService } from './services/course/memory-course.service';
import { MaterialModule } from '../../modules/material/material.module';
import { CustomRouterModule } from '../../modules/router/router.module';

@NgModule({
  declarations: [
    AddCourseComponent,
    AuthorsComponent,
    CourseComponent,
    DateComponent,
    DurationComponent,
    LoaderComponent,
    ToolboxComponent,
    ReleaseBorderDirective,
    CoursesPageComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CustomRouterModule,
  ],
  providers: [
    { provide: 'memoryCourseService', useClass: MemoryCourseService },
  ],
})
export class CourseModule { }
