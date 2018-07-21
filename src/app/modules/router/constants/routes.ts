import { Routes } from '@angular/router';

import { Path } from './path';
import { LoginComponent } from '../../auth/components/login/login.component';
import { CoursesPageComponent } from '../../course/pages/courses-page/courses-page.component';

export const ROUTES: Routes = [
  { path: Path.LOGIN, component: LoginComponent },
  { path: Path.COURSES, component: CoursesPageComponent },
  { path: '', redirectTo: `/${Path.COURSES}`, pathMatch: 'full' },
];
