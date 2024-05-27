import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { consecutiveGuardGuard } from './consecutive-guard.guard';

describe('consecutiveGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => consecutiveGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
