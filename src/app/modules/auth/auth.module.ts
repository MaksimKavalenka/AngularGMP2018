import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LocalStorageAuthService } from './services/auth/local-storage-auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    LocalStorageAuthService,
  ],
})
export class AuthModule { }
