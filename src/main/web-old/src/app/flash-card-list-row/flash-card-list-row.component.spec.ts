import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardListRowComponent } from './flash-card-list-row.component';

describe('FlashCardListRowComponent', () => {
  let component: FlashCardListRowComponent;
  let fixture: ComponentFixture<FlashCardListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashCardListRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashCardListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
