import { TestBed } from '@angular/core/testing';

import { ArtistAuthService } from './artist-auth.service';

describe('ArtistAuthService', () => {
  let service: ArtistAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
