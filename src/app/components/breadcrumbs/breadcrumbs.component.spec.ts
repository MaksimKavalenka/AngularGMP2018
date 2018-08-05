import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { Path } from '../../modules/router/constants/path';
import { EventService } from '../../services/event.service';

const testTitle = 'Test title';

@Component({
  template: '',
})
class MockComponent { }

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  // let spyEventService: Partial<EventService>;

  beforeEach(async(() => {
    // spyEventService = {
    //   data: of({ title: testTitle }),
    // };

    TestBed.configureTestingModule({
      declarations: [
        BreadcrumbsComponent,
        MockComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: Path.COURSES, component: MockComponent },
        ]),
      ],
      providers: [
        EventService,
        // { provide: EventService, useValue: spyEventService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set up a title', () => {
  //   expect(component.title).toBe(testTitle);
  // });
});
