import { TestBed, inject } from '@angular/core/testing';

import { NodeAuthorService } from './node-author.service';

describe('NodeAuthorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeAuthorService],
    });
  });

  it('should be created', inject([NodeAuthorService], (service: NodeAuthorService) => {
    expect(service).toBeTruthy();
  }));
});
