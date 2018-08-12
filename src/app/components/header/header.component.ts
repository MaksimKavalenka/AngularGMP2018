import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../modules/auth/entities/user';
import { IAuthService } from '../../modules/auth/services/auth/auth.service';
import { Path } from '../../modules/router/constants/path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public user: User;

  public constructor(
    private router: Router,
    @Inject('authService') private authService: IAuthService,
  ) { }

  public ngOnInit() {
    this.authService.loginObservable.subscribe(() => {
      this.authService.getUser().subscribe(user => this.user = user);
    });
  }

  public logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate([`/${Path.LOGIN}`]));
  }

  public isLoginPage(): boolean {
    return this.router.url === `/${Path.LOGIN}`;
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
