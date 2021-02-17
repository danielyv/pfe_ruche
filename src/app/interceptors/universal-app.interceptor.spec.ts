import { TestBed } from '@angular/core/testing';

import { UniversalAppInterceptor } from './universal-app.interceptor';

describe('UniversalAppInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UniversalAppInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UniversalAppInterceptor = TestBed.inject(UniversalAppInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
