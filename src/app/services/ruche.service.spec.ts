import { TestBed } from '@angular/core/testing';

import { RucheService } from './ruche.service';

describe('RucheService', () => {
  let service: RucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
