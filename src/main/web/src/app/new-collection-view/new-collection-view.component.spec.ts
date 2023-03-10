import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCollectionViewComponent } from './new-collection-view.component';

describe('NewCollectionViewComponent', () => {
  let component: NewCollectionViewComponent;
  let fixture: ComponentFixture<NewCollectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCollectionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
