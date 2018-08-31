import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { CustomCommonModule } from './modules/common/common.module';
import { CustomRouterModule } from './modules/router/router.module';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  imports: [
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    CourseModule,
    CustomCommonModule,
    CustomRouterModule,
  ],
  providers: [LoaderService],
})
export class AppModule { }
