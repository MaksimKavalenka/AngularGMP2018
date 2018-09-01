import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthorsComponent } from './components/authors/authors.component';
import { CourseComponent } from './components/course/course.component';
import { DateComponent } from './components/date/date.component';
import { DurationComponent } from './components/duration/duration.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { IsNumberDirective } from './directives/is-number/is-number.directive';
import { ReleaseBorderDirective } from './directives/release-border/release-border.directive';
import { CourseEffects } from './effects/course.effects';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { SaveCoursePageComponent } from './pages/save-course-page/save-course-page.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { courseReducer } from './reducers/course.reducer';
import { NodeCourseService } from './services/course/node-course.service';
import { CustomCommonModule } from '../common/common.module';
import { MaterialModule } from '../material/material.module';
import { CustomRouterModule } from '../router/router.module';

@NgModule({
  declarations: [
    AuthorsComponent,
    CourseComponent,
    DateComponent,
    DurationComponent,
    DurationInputComponent,
    PaginationComponent,
    ToolboxComponent,
    IsNumberDirective,
    ReleaseBorderDirective,
    CoursesPageComponent,
    SaveCoursePageComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    CustomRouterModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([CourseEffects]),
    StoreModule.forRoot({ course: courseReducer }),
  ],
  providers: [
    { provide: 'courseService', useClass: NodeCourseService },
  ],
})
export class CourseModule { }
