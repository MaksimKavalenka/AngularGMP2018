import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AddCourseComponent } from './add-course.component';
import { ICourseService } from '../../services/course/course.service';
import { Path } from '../../../../modules/router/constants/path';

@Component({
  template: '',
})
class MockComponent { }

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  let spyCourseService: Partial<ICourseService>;

  beforeEach(async(() => {
    spyCourseService = {
      addCourse: jasmine.createSpy('addCourse').and.callThrough(),
    };

    TestBed.configureTestingModule({
      declarations: [
        AddCourseComponent,
        MockComponent,
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: Path.COURSES, component: MockComponent },
        ]),
      ],
      providers: [{ provide: 'memoryCourseService', useValue: spyCourseService }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
