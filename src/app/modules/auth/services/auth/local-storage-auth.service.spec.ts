import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';
import { LocalStorageAuthService } from './local-storage-auth.service';
import { User } from '../../entities/user';

const testUser: User = new User({
  id: '1',
  firstName: 'firstName',
  lastName: 'lastName',
  login: 'login',
  password: 'password',
});
const userId: string = null;

describe('LocalStorageAuthService', () => {
  let localStorageAuthService: LocalStorageAuthService;

  let spyLocalStorageAuthService: Partial<LocalStorageAuthService>;
  let spyCookieService: Partial<CookieService>;
  let spyWebStorageService: Partial<WebStorageService>;

  beforeEach(() => {
    spyCookieService = {
      get: jasmine.createSpy('get').and.returnValue(userId),
      set: jasmine.createSpy('set'),
      delete: jasmine.createSpy('delete'),
    };

    spyWebStorageService = {
      get: jasmine.createSpy('get').and.returnValue(testUser),
      set: jasmine.createSpy('set'),
      remove: jasmine.createSpy('remove'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: spyCookieService },
        { provide: LOCAL_STORAGE, useValue: spyWebStorageService },
        { provide: 'authService', useClass: LocalStorageAuthService },
      ],
    });

    localStorageAuthService = TestBed.get('authService');

    spyLocalStorageAuthService = {
      login: spyOn(localStorageAuthService, 'login').and.callThrough(),
      logout: spyOn(localStorageAuthService, 'logout').and.callThrough(),
      isAuthenticated: spyOn(localStorageAuthService, 'isAuthenticated').and.callThrough(),
      getUser: spyOn(localStorageAuthService, 'getUser').and.callThrough(),
    };
  });

  it('should login a user', (() => {
    const login = 'login';
    const password = 'password';
    localStorageAuthService.login(login, password);

    expect(spyLocalStorageAuthService.login).toHaveBeenCalledWith(login, password);
    expect(spyLocalStorageAuthService.isAuthenticated).toHaveBeenCalled();
    expect(spyCookieService.get).toHaveBeenCalledWith(AuthService.TOKEN_KEY);
  }));

  it('should logout a user', (() => {
    localStorageAuthService.logout();

    expect(spyLocalStorageAuthService.logout).toHaveBeenCalled();
    expect(spyCookieService.delete).toHaveBeenCalledWith(AuthService.TOKEN_KEY);
    expect(spyWebStorageService.remove).toHaveBeenCalledWith(userId);
  }));

  it('should check if a user is authenticated', (() => {
    const isAuthenticated: boolean = localStorageAuthService.isAuthenticated();

    expect(isAuthenticated).toBeFalsy();

    expect(spyLocalStorageAuthService.isAuthenticated).toHaveBeenCalled();
    expect(spyCookieService.get).toHaveBeenCalledWith(AuthService.TOKEN_KEY);
  }));

  it('should get a user', (() => {
    localStorageAuthService.getUser();

    expect(spyLocalStorageAuthService.getUser).toHaveBeenCalled();
    expect(spyCookieService.get).toHaveBeenCalledWith(AuthService.TOKEN_KEY);
    expect(spyWebStorageService.get).toHaveBeenCalledWith(userId);
  }));
});
