import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoursesPageComponent } from '../course/pages/courses-page/courses-page.component';
import { LoginPageComponent } from '../auth/pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'courses', component: CoursesPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CustomRouterModule { }
