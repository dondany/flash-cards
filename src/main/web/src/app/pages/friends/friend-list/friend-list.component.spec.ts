import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListComponent } from './friend-list.component';

describe('FriendsListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendListComponent]
    });
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
