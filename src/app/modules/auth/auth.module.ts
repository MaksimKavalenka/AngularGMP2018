import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StorageServiceModule } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './components/login/login.component';
import { AuthEffects } from './effects/auth.effects';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { authReducer } from './reducers/auth.reducer';
import { NodeAuthService } from './services/auth/node-auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    StorageServiceModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot({ auth: authReducer }),
  ],
  providers: [
    AuthGuard,
    CookieService,
    { provide: 'authService', useClass: NodeAuthService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [NodeAuthService],
    };
  }
}
