import { Component } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { IAuthService } from '../services/auth/auth.service';
import { Path } from '../../router/constants/path';

@Component({
  template: '',
})
class MockComponent { }

describe('AuthGuardGuard', () => {
  let spyMockRouter: Partial<RouterTestingModule>;
  let spyAuthService: Partial<IAuthService>;

  beforeEach(() => {
    spyMockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    spyAuthService = {
      logout: jasmine.createSpy('logout'),
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
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
        { provide: 'localStorageAuthService', useValue: spyAuthService },
      ],
    });
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
