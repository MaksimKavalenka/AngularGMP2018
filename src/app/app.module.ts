import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthEffects } from './modules/auth/effects/auth.effects';
import { authReducer } from './modules/auth/reducers/auth.reducer';
import { CourseModule } from './modules/course/course.module';
import { courseReducer } from './modules/course/reducers/course.reducer';
import { CustomCommonModule } from './modules/common/common.module';
import { CourseEffects } from './modules/course/effects/course.effects';
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
    EffectsModule.forRoot([AuthEffects, CourseEffects]),
    StoreModule.forRoot({
      auth: authReducer,
      course: courseReducer,
    }),
  ],
  providers: [LoaderService],
})
export class AppModule { }
