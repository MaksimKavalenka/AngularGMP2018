import { TestBed, inject } from '@angular/core/testing';

import { JsonServerCourseService } from './json-server-course.service';

describe('JsonServerCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonServerCourseService]
    });
  });

  it('should be created', inject([JsonServerCourseService], (service: JsonServerCourseService) => {
    expect(service).toBeTruthy();
  }));
});
