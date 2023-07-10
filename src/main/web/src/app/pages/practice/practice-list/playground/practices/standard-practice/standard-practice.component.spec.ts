import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardPracticeComponent } from './standard-practice.component';

describe('StandardPracticeComponent', () => {
  let component: StandardPracticeComponent;
  let fixture: ComponentFixture<StandardPracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandardPracticeComponent]
    });
    fixture = TestBed.createComponent(StandardPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
