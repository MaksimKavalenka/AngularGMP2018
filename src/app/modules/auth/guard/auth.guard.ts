import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthService } from '../services/auth/auth.service';
import { Path } from '../../router/constants/path';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(
    private router: Router,
    @Inject('authService') private authService: IAuthService,
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated: boolean = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate([`/${Path.LOGIN}`]);
    }
    return isAuthenticated;
  }

}
