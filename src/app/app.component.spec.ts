import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { IAuthService } from './modules/auth/services/auth/auth.service';

describe('AppComponent', () => {
  let spyAuthService: Partial<IAuthService>;

  beforeEach(async(() => {
    spyAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: 'localStorageAuthService', useValue: spyAuthService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'AngularGMP2018'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toBe('AngularGMP2018');
  }));
});
