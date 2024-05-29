import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistChatComponent } from './artist-chat.component';

describe('ArtistChatComponent', () => {
  let component: ArtistChatComponent;
  let fixture: ComponentFixture<ArtistChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistChatComponent]
    });
    fixture = TestBed.createComponent(ArtistChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
