import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Login } from '../../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  private authStore: Subscription;
  public _login: string;
  public password: string;
  public errorMessage: string;

  public constructor(
    private store: Store<any>,
  ) { }

  public ngOnInit() {
    this.authStore = this.store.select('auth').subscribe(
      auth => this.errorMessage = auth.err ? auth.err.error : auth.err,
    );
  }

  public ngOnDestroy() {
    this.authStore.unsubscribe();
  }

  public login(): void {
    this.store.dispatch(new Login(this._login, this.password));
  }

}
