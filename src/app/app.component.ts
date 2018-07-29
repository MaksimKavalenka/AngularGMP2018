import { Component, Inject } from '@angular/core';
import { IAuthService } from './modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public title = 'AngularGMP2018';

  public constructor(
    @Inject('localStorageAuthService') private authService: IAuthService,
  ) { }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
