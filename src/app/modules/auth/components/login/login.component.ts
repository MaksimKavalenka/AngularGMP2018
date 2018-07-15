import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthService } from '../../services/auth/auth.service';
import { Path } from '../../../router/constants/path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public email: string;
  public password: string;

  public constructor(
    private router: Router,
    @Inject('localStorageAuthService') private authService: IAuthService,
  ) { }

  public login(): void {
    this.authService.login(this.email, this.password);
    this.router.navigate([`/${Path.COURSES}`]);
  }

}
