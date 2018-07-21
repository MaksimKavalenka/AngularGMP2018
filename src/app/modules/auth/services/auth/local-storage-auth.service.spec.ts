import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';

import { LocalStorageAuthService } from './local-storage-auth.service';
import { User } from '../../entities/user';

const testUser: User = new User('1', 'firstName', 'lastName', 'email', 'password');
const userId: string = null;

describe('AuthorizationService', () => {
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
        { provide: 'localStorageAuthService', useClass: LocalStorageAuthService },
      ],
    });

    localStorageAuthService = TestBed.get('localStorageAuthService');

    spyLocalStorageAuthService = {
      login: spyOn(localStorageAuthService, 'login').and.callThrough(),
      logout: spyOn(localStorageAuthService, 'logout').and.callThrough(),
      isAuthenticated: spyOn(localStorageAuthService, 'isAuthenticated').and.callThrough(),
      getUser: spyOn(localStorageAuthService, 'getUser').and.callThrough(),
    };
  });

  it('should login a user', (() => {
    const email = 'email';
    const password = 'password';
    const user: User = localStorageAuthService.login(email, password);

    expect(user.email).toBe(email);
    expect(user.password).toBe(password);

    expect(spyLocalStorageAuthService.login).toHaveBeenCalledWith(email, password);
    expect(spyLocalStorageAuthService.isAuthenticated).toHaveBeenCalled();
    expect(spyCookieService.get).toHaveBeenCalledWith(LocalStorageAuthService.USER_ID_KEY);
    expect(spyWebStorageService.set).toHaveBeenCalledWith(user.id, user);
    expect(spyCookieService.set).toHaveBeenCalledWith(LocalStorageAuthService.USER_ID_KEY, user.id);
  }));

  it('should logout a user', (() => {
    localStorageAuthService.logout();

    expect(spyLocalStorageAuthService.logout).toHaveBeenCalled();
    expect(spyCookieService.delete).toHaveBeenCalledWith(LocalStorageAuthService.USER_ID_KEY);
    expect(spyWebStorageService.remove).toHaveBeenCalledWith(userId);
  }));

  it('should check if a user is authenticated', (() => {
    const isAuthenticated: boolean = localStorageAuthService.isAuthenticated();

    expect(isAuthenticated).toBeFalsy();

    expect(spyLocalStorageAuthService.isAuthenticated).toHaveBeenCalled();
    expect(spyCookieService.get).toHaveBeenCalledWith(LocalStorageAuthService.USER_ID_KEY);
  }));

  it('should get a user', (() => {
    const user: User = localStorageAuthService.getUser();

    expect(user).toEqual(testUser);

    expect(spyLocalStorageAuthService.getUser).toHaveBeenCalled();
    expect(spyCookieService.get).toHaveBeenCalledWith(LocalStorageAuthService.USER_ID_KEY);
    expect(spyWebStorageService.get).toHaveBeenCalledWith(userId);
  }));
});
