import { TestBed } from '@angular/core/testing';

import { PriceExceptionService } from './price-exception.service';

describe('PriceExceptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceExceptionService = TestBed.get(PriceExceptionService);
    expect(service).toBeTruthy();
  });
});
