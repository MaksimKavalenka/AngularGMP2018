import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ReleaseBorderDirective } from './directives/release-border/release-border.directive';
import { MaterialModule } from './modules/material/material.module';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { MemoryCourseService } from './services/course/memory-course.service';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    CourseComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    ToolboxComponent,
    ReleaseBorderDirective,
    CoursesPageComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
  ],
  entryComponents: [
    DialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    MemoryCourseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
