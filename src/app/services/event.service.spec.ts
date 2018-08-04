import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EventService } from './event.service';

describe('EventService', () => {
  let spyMockRouter: Partial<RouterTestingModule>;

  beforeEach(() => {
    spyMockRouter = {
      events: of(Event),
    };

    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: Router, useValue: spyMockRouter },
      ],
    });
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
