import { Component } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { IAuthService } from '../services/auth/auth.service';
import { Path } from '../../router/constants/path';

@Component({
  template: '',
})
class MockComponent { }

describe('AuthGuardGuard', () => {
  const isAuthenticated = false;

  let spyMockRouter: Partial<RouterTestingModule>;
  let spyAuthService: Partial<IAuthService>;

  beforeEach(async(() => {
    spyMockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    spyAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(isAuthenticated),
    };

    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: Path.LOGIN, component: MockComponent },
        ]),
      ],
      providers: [
        AuthGuard,
        { provide: Router, useValue: spyMockRouter },
        { provide: 'authService', useValue: spyAuthService },
      ],
    });
  }));

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should check if can activate', inject([AuthGuard], (guard: AuthGuard) => {
    const canActivate = guard.canActivate(null, null);

    expect(spyAuthService.isAuthenticated).toHaveBeenCalled();
    expect(canActivate).toBe(isAuthenticated);
  }));
});
