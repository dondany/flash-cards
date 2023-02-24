import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcCardComponent } from './fc-card.component';

describe('FcCardComponent', () => {
  let component: FcCardComponent;
  let fixture: ComponentFixture<FcCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
