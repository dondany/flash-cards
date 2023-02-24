import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcContextMenuComponent } from './fc-context-menu.component';

describe('FcContextMenuComponent', () => {
  let component: FcContextMenuComponent;
  let fixture: ComponentFixture<FcContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
