import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public errorMessage: string;

  public user: FormGroup = new FormGroup({
    login: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(32),
    ]),
  });

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
    this.store.dispatch(new Login(this.user.get('login').value, this.user.get('password').value));
  }

}
