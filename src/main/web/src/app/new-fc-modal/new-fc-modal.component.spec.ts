import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFcModalComponent } from './new-fc-modal.component';

describe('NewFcModalComponent', () => {
  let component: NewFcModalComponent;
  let fixture: ComponentFixture<NewFcModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFcModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
