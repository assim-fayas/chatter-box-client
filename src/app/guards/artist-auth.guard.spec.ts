import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { artistAuthGuard } from './artist-auth.guard';

describe('artistAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => artistAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
