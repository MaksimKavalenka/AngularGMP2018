import { TestBed, inject } from '@angular/core/testing';

import { NodeAuthService } from './node-auth.service';

describe('NodeAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeAuthService],
    });
  });

  it('should be created', inject([NodeAuthService], (service: NodeAuthService) => {
    expect(service).toBeTruthy();
  }));
});
