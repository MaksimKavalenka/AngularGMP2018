import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EventService } from './event.service';

describe('EventService', () => {
  let eventService: EventService;

  let spyMockRouter: Partial<RouterTestingModule>;
  let spyEventService: Partial<EventService>;

  beforeEach(() => {
    spyMockRouter = {
      events: of(new NavigationEnd(null, null, null)),
    };

    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: Router, useValue: spyMockRouter },
      ],
    });

    eventService = TestBed.get(EventService);

    spyEventService = {
      pushData: spyOn(eventService, 'pushData').and.callThrough(),
    };
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));

  it('should push data', inject([EventService], (service: EventService) => {
    const data: any = { value: 'Test value' };
    service.pushData(data);
    expect(spyEventService.pushData).toHaveBeenCalledWith(data);
  }));
});
