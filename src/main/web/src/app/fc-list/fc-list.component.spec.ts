import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcListComponent } from './fc-list.component';

describe('FlashCardListComponent', () => {
  let component: FcListComponent;
  let fixture: ComponentFixture<FcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
