import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcCollectionListComponent } from './fc-collection-list.component';

describe('FcCollectionListComponent', () => {
  let component: FcCollectionListComponent;
  let fixture: ComponentFixture<FcCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcCollectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
