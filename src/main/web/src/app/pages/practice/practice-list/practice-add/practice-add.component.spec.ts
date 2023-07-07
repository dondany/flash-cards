import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAddComponent } from './practice-add.component';

describe('PracticeAddComponent', () => {
  let component: PracticeAddComponent;
  let fixture: ComponentFixture<PracticeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeAddComponent]
    });
    fixture = TestBed.createComponent(PracticeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
