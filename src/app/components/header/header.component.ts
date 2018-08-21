import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Logout, GetUser } from '../../modules/auth/actions/auth.actions';
import { User } from '../../modules/auth/entities/user';
import { Path } from '../../modules/router/constants/path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authStore: Subscription;
  public user: User;
  public isAuthenticated: boolean;

  public constructor(
    private router: Router,
    private store: Store<any>,
  ) { }

  public ngOnInit() {
    this.authStore = this.store.select('auth').subscribe(
      (auth) => {
        this.user = auth.user;
        this.isAuthenticated = auth.isAuthenticated;
      },
    );

    this.store.dispatch(new GetUser());
  }

  public ngOnDestroy() {
    this.authStore.unsubscribe();
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public isLoginPage(): boolean {
    return this.router.url === `/${Path.LOGIN}`;
  }

}
