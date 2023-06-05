import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddProjectFormControlType} from "../../project-add/types/add-project-form-group-type";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from "primeng/api";
import {ProjectService} from "../../project-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {ProjectType} from "../../types/project-type";

@Component({
  selector: 'fc-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  protected formGroup = this.formBuilder.group<AddProjectFormControlType>({
    name: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    visibility: this.formBuilder.control('PRIVATE', {validators: [Validators.required], nonNullable: true})
  })

  project!: ProjectType;
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    const projectId = this.activatedRoute.snapshot.params['id'];

    this.projectService.getProject(projectId)
      .pipe(takeUntil(this.destroy),
        tap((project) => {
          this.project = project;
          // this.formGroup.controls.name.setValue(project.name);
          this.formGroup.controls.name.patchValue(project.name);
          this.formGroup.controls.description.setValue(project.description);
          this.formGroup.controls.visibility.setValue(project.visibility);
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '/projects'},
            {label: project.name, routerLink: `/projects/${project.id}`},
            {label: 'Settings', routerLink: `/projects/add`}
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/../'};
        })).subscribe();
  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.projectService.updateProject(this.project.id, value)
      .subscribe(project => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: `Settings for project ${project.name} have been saved!`,
        });
        this.router.navigate(['projects', project.id]);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  handleOnDelete() {
    this.confirmationService.confirm({
      message: 'Are You sure You want to delete this Project?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteProject(this.project.id)
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: `Project ${this.project.name} has been deleted!`
            });
            this.router.navigate(['projects']);
          })
      }
    });
  }
}
