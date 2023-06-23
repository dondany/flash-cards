import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddProjectFormControlType} from "../../project-add/types/add-project-form-group-type";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ProjectService} from "../../project-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {ProjectType} from "../../types/project-type";
import {ProjectSettingsFormControlType} from "./types/project-settings-form-group-type";
import {FriendType} from "../../../friends/types/friend-type";
import {FriendsService} from "../../../friends/friends-service";

@Component({
  selector: 'fc-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  protected formGroup = this.formBuilder.group<ProjectSettingsFormControlType>({
    name: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    visibility: this.formBuilder.control('PRIVATE', {validators: [Validators.required], nonNullable: true})
  })

  project!: ProjectType;
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  friends!: FriendType[];
  showNewMemberDialog: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private friendService: FriendsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    const projectId = this.activatedRoute.snapshot.params['id'];
    this.projectService.getProject(projectId)
      .pipe(takeUntil(this.destroy),
        tap((project) => {
          this.project = project;
          this.formGroup.controls.name.setValue(project.name);
          this.formGroup.controls.description.setValue(project.description);
          this.formGroup.controls.visibility.setValue(project.visibility);
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '/projects'},
            {label: project.name, routerLink: `/projects/${project.id}`},
            {label: 'Settings', routerLink: `/projects/settings`}
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/home'};
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
        this.formGroup.markAsPristine();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onDelete() {
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

  removeMember(memberId: number) {
    console.log(memberId);
    this.projectService.deleteProjectMember(this.project.id, memberId)
      .subscribe(() => {
        this.init();
      })
  }

  addMember(userId: number) {
    this.projectService.addProjectMember(this.project.id, userId)
      .subscribe(() => {
        this.showNewMemberDialog = false;
        this.init();
      })
  }

  onShowNewMemberDialog() {
    this.friendService.getFriends()
      .subscribe((friends) => {
        this.friends = friends;
      })
  }

  get name() {
    return this.formGroup.controls.name;
  }

  get description() {
    return this.formGroup.controls.description;
  }



}
