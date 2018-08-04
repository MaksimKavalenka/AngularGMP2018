import { Routes } from '@angular/router';

import { Path } from './path';
import { NoContentComponent } from '../components/no-content/no-content.component';
import { LoginComponent } from '../../auth/components/login/login.component';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { CoursesPageComponent } from '../../course/pages/courses-page/courses-page.component';
import { SaveCoursePageComponent } from '../../course/pages/save-course-page/save-course-page.component';

export const ROUTES: Routes = [
  { path: Path.LOGIN, component: LoginComponent },
  { path: Path.COURSES, component: CoursesPageComponent, canActivate: [AuthGuard] },
  { path: Path.ADD_COURSE, component: SaveCoursePageComponent, canActivate: [AuthGuard] },
  { path: Path.EDIT_COURSE, component: SaveCoursePageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: `/${Path.COURSES}`, pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
];
