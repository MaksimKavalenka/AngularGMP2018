import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthService } from '../../modules/auth/services/auth/auth.service';
import { Path } from '../../modules/router/constants/path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  public constructor(
    private router: Router,
    @Inject('localStorageAuthService') private authService: IAuthService,
  ) { }

  public logout(): void {
    this.authService.logout();
  }

  public isLoginPage(): boolean {
    return this.router.url === `/${Path.LOGIN}`;
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
