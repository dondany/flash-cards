import { TestBed } from '@angular/core/testing';

import { PagingService } from './paging.service';

describe('PagingServiceService', () => {
  let service: PagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
