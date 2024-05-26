import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHomeComponent } from './artist-home.component';

describe('ArtistHomeComponent', () => {
  let component: ArtistHomeComponent;
  let fixture: ComponentFixture<ArtistHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistHomeComponent]
    });
    fixture = TestBed.createComponent(ArtistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
