import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsViewComponent } from './project-settings-view.component';

describe('ProjectSettingsViewComponent', () => {
  let component: ProjectSettingsViewComponent;
  let fixture: ComponentFixture<ProjectSettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSettingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
