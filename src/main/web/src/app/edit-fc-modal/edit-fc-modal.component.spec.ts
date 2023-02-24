import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFcModalComponent } from './edit-fc-modal.component';

describe('EditFcModalComponent', () => {
  let component: EditFcModalComponent;
  let fixture: ComponentFixture<EditFcModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFcModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
