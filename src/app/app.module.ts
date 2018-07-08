import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ReleaseBorderDirective } from './directives/release-border/release-border.directive';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { MemoryCourseService } from './services/course-service/MemoryCourseService';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    CourseComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    ToolboxComponent,
    ReleaseBorderDirective,
    CoursesPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    MemoryCourseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
