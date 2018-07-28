import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoContentComponent } from './components/no-content/no-content.component';
import { ROUTES } from './constants/routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  exports: [RouterModule],
  declarations: [NoContentComponent],
})
export class CustomRouterModule { }
