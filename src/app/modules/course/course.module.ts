import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseComponent } from './components/course/course.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ReleaseBorderDirective } from './directives/release-border/release-border.directive';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { MemoryCourseService } from './services/course/memory-course.service';
import { MaterialModule } from '../../modules/material/material.module';

@NgModule({
  declarations: [
    CourseComponent,
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
  ],
  providers: [
    MemoryCourseService,
  ],
})
export class CourseModule { }
