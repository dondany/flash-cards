import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";
import {ProjectService} from "../project-service";
import {AddProjectFormControlType} from "./types/add-project-form-group-type";
import {Router} from "@angular/router";

@Component({
  selector: 'fc-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit{
  protected formGroup = this.formBuilder.group<AddProjectFormControlType>({
    name: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  })

  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {label: 'Projects', routerLink: '/projects'},
      {label:  'Add New', routerLink: `/projects/add`}
    ];
    this.homeItem = {icon: 'pi pi-home', routerLink: '/../'};
  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.projectService.createProject(value)
      .subscribe(project => {
        this.router.navigate(['projects']);
      });
  }

  get name() {
    return this.formGroup.controls.name;
  }

  get description() {
    return this.formGroup.controls.description;
  }
}
