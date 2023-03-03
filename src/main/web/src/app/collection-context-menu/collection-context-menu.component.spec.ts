import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionContextMenuComponent } from './collection-context-menu.component';

describe('CollectionContextMenuComponent', () => {
  let component: CollectionContextMenuComponent;
  let fixture: ComponentFixture<CollectionContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
