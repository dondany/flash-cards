import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";
import {AddPracticeFormControlType} from "./types/add-practice-form-group-type";
import {ProjectSimpleType} from "../../../../shared/types/project-simple-type";
import {ProjectService} from "../../../project/project-service";
import {CollectionSimpleType} from "../../../../shared/types/collection-simple-type";
import {DropdownChangeEvent} from "primeng/dropdown";
import {PracticeService} from "../../../../shared/services/practice-service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

interface PracticeType {
  name: string;
  value: string;
}

@Component({
  selector: 'fc-practice-add',
  templateUrl: './practice-add.component.html',
  styleUrls: ['./practice-add.component.scss']
})
export class PracticeAddComponent implements OnInit {
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;
  types: PracticeType[] | undefined;

  projects!: ProjectSimpleType[];
  collections: CollectionSimpleType[] = [];

  protected formGroup = this.formBuilder.group<AddPracticeFormControlType>({
    name: this.formBuilder.control('', {validators: Validators.required, nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    type: this.formBuilder.control(undefined, { validators: [Validators.required], nonNullable: true}),
    projectId: this.formBuilder.control(undefined, { validators: [Validators.required], nonNullable: true}),
    collectionIds: this.formBuilder.control([], { validators: [Validators.required], nonNullable: true}),
  })

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private practiceService: PracticeService,
              private messageService: MessageService,
              private location: Location) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      {label: 'Practices', routerLink: '..'},
      {label:  'Add New', routerLink: `.`}
    ];
    this.homeItem = {icon: 'pi pi-home', routerLink: '/home'};

    this.types = [
      { name: 'Standard', value: 'STANDARD' },
      { name: 'Quiz', value: 'QUIZ' }
    ]

    this.projectService.getSimplifiedProjects()
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.practiceService.createPractice(value)
      .subscribe(practice => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: `Practice ${practice.name} has been created!`,
        });
        this.location.back();
      });
  }

  get name() {
    return this.formGroup.controls.name;
  }

  get description() {
    return this.formGroup.controls.description;
  }

  get type() {
    return this.formGroup.controls.type;
  }

  get projectId() {
    return this.formGroup.controls.projectId;
  }

  onProjectDropdownChange($event: DropdownChangeEvent) {
    this.initCollectionDropdown($event.value);
  }

  initCollectionDropdown(projectId: number) {
    let project = this.projects.find((p) => p.id === projectId);
    this.collections = project ? project.collections : [];
  }
}
