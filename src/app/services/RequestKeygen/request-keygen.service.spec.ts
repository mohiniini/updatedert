import { TestBed } from '@angular/core/testing';

import { RequestKeygenService } from './request-keygen.service';

describe('RequestKeygenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestKeygenService = TestBed.get(RequestKeygenService);
    expect(service).toBeTruthy();
  });
});
