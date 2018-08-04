import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoContentComponent } from './components/no-content/no-content.component';
import { ROUTES } from './constants/routes';

@NgModule({
  declarations: [NoContentComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
})
export class CustomRouterModule { }
