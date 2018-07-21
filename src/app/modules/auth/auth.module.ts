import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './components/login/login.component';
import { LocalStorageAuthService } from './services/auth/local-storage-auth.service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StorageServiceModule,
  ],
  providers: [
    CookieService,
    { provide: 'localStorageAuthService', useClass: LocalStorageAuthService },
  ],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        LocalStorageAuthService,
      ],
    };
  }
}
