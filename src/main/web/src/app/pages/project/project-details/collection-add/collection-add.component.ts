import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MenuItem, MessageService} from "primeng/api";
import {ProjectService} from "../../project-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CollectionAddFormControlType} from "./types/collection-add-form-group-type";
import {ProjectType} from "../../types/project-type";

@Component({
  selector: 'fc-collection-add',
  templateUrl: './collection-add.component.html',
  styleUrls: ['./collection-add.component.scss']
})
export class CollectionAddComponent {
  protected formGroup = this.formBuilder.group<CollectionAddFormControlType>({
    name: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  })

  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;
  project!: ProjectType;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const projectId = this.activatedRoute.snapshot.params['id'];
    this.projectService.getProject(projectId)
      .subscribe((project) => {
        this.project = project;
        this.breadCrumbItems = [
          {label: 'Projects', routerLink: '/projects'},
          {label: this.project.name, routerLink: '../..'},
          {label: 'Add New Collection', routerLink: `/collections/add`}
        ];
        this.homeItem = {icon: 'pi pi-home', routerLink: '/../'};
      })

  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.projectService.createCollection(this.project.id, value)
      .subscribe(collection => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: `Collection ${collection.name} has been created!`,
        });
        this.router.navigate(['projects', this.project.id]);
      });
  }

  get name() {
    return this.formGroup.controls.name;
  }

  get description() {
    return this.formGroup.controls.description;
  }
}
