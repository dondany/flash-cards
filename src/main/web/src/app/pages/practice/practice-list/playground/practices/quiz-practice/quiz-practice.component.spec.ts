import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPracticeComponent } from './quiz-practice.component';

describe('QuizPracticeComponent', () => {
  let component: QuizPracticeComponent;
  let fixture: ComponentFixture<QuizPracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizPracticeComponent]
    });
    fixture = TestBed.createComponent(QuizPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
