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

  public _login: string;
  public password: string;
  public errorMessage: string;

  public constructor(
    private router: Router,
    @Inject('authService') private authService: IAuthService,
  ) { }

  public login(): void {
    this.authService.login(this._login, this.password).subscribe(
      () => this.router.navigate([`/${Path.COURSES}`]),
      err => this.errorMessage = err.error,
    );
  }

}
