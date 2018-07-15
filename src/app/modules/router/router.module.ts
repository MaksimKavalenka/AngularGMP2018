import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from './constants/routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class CustomRouterModule { }
