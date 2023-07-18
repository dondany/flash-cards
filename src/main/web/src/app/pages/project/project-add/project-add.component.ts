import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";
import {ProjectService} from "../project-service";
import {AddProjectFormControlType} from "./types/add-project-form-group-type";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'fc-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit{
  protected formGroup = this.formBuilder.group<AddProjectFormControlType>({
    name: this.formBuilder.control('', {validators: Validators.required, nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    visibility: this.formBuilder.control('PRIVATE', { validators: [Validators.required], nonNullable: true})
  })

  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private messageService: MessageService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {label: 'Projects', routerLink: '..'},
      {label:  'Add New', routerLink: `.`}
    ];
    this.homeItem = {icon: 'pi pi-home', routerLink: '/home'};
  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.projectService.createProject(value)
      .subscribe(project => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: `Project ${project.name} has been created!`,
        });
        console.log(this.router.getCurrentNavigation());
        this.location.back();
      });
  }

  get name() {
    return this.formGroup.controls.name;
  }

  get description() {
    return this.formGroup.controls.description;
  }
}
