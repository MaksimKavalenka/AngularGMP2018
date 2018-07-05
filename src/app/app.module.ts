import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseService } from './services/CourseService';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    CourseComponent,
    FooterComponent,
    HeaderComponent,
    ToolboxComponent,
    CoursesPageComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    CourseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
