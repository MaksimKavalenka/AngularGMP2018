import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { IAuthService } from '../../modules/auth/services/auth/auth.service';
import { Path } from '../../modules/router/constants/path';

@Component({
  template: '',
})
class MockComponent { }

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let spyMockRouter: Partial<RouterTestingModule>;
  let spyAuthService: Partial<IAuthService>;

  beforeEach(async(() => {
    spyMockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    spyAuthService = {
      logout: jasmine.createSpy('logout'),
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
    };

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: Path.LOGIN, component: MockComponent },
        ]),
      ],
      providers: [
        { provide: Router, useValue: spyMockRouter },
        { provide: 'authService', useValue: spyAuthService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout a user', () => {
    const logoutButton = fixture.debugElement.query(By.css('#logout'));
    logoutButton.triggerEventHandler('click', null);
    expect(spyAuthService.logout).toHaveBeenCalled();
  });
});
