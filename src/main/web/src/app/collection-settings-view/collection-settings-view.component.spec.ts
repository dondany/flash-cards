import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSettingsViewComponent } from './collection-settings-view.component';

describe('CollectionSettingsViewComponent', () => {
  let component: CollectionSettingsViewComponent;
  let fixture: ComponentFixture<CollectionSettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionSettingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
