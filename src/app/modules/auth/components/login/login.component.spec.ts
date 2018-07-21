import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { User } from '../../entities/user';
import { IAuthService } from '../../services/auth/auth.service';
import { Path } from '../../../router/constants/path';

const testUser: User = new User('1', 'firstName', 'lastName', 'email', 'password');

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let spyMockRouter: Partial<Router>;
  let spyAuthService: Partial<IAuthService>;

  beforeEach(async(() => {
    spyMockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    spyAuthService = {
      login: jasmine.createSpy('login').and.returnValue(testUser),
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        RouterModule,
      ],
      providers: [
        { provide: Router, useValue: spyMockRouter },
        { provide: 'localStorageAuthService', useValue: spyAuthService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login a user', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    const loginForm = fixture.debugElement.query(By.css('.form-submit'));

    emailInput.value = testUser.email;
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = testUser.password;
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    loginForm.triggerEventHandler('submit', null);

    expect(spyAuthService.login).toHaveBeenCalledWith(testUser.email, testUser.password);
    expect(spyMockRouter.navigate).toHaveBeenCalledWith([`/${Path.COURSES}`]);
  }));
});
