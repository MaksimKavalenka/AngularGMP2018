import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    DialogComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
  exports: [
    MatDialogModule,
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
})
export class MaterialModule { }
