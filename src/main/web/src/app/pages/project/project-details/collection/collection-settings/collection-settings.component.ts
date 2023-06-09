import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {ProjectService} from "../../../project-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {CollectionSettingsFormControlType} from "./types/collection-settings-form-group-type";
import {CollectionType} from "../../../types/collection-type";

@Component({
  selector: 'fc-collection-settings',
  templateUrl: './collection-settings.component.html',
  styleUrls: ['./collection-settings.component.scss']
})
export class CollectionSettingsComponent implements OnInit, OnDestroy  {
  private destroy = new Subject<void>();

  protected formGroup = this.formBuilder.group<CollectionSettingsFormControlType>({
    name: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    description: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true})
  })

  collection!: CollectionType;
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;
  projectId!: number;
  collectionId!: number;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.collectionId = this.activatedRoute.snapshot.params['collectionId']

    this.projectService.getCollection(this.projectId, this.collectionId)
      .pipe(takeUntil(this.destroy),
        tap((collection) => {
          this.collection = collection;
          this.formGroup.controls.name.setValue(collection.name);
          this.formGroup.controls.description.setValue(collection.description);
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '/projects'},
            {label: collection.projectName, routerLink: `/projects/${this.projectId}`},
            {label: collection.name, routerLink: `/projects/${this.projectId}/collections/${this.collectionId}`},
            {label: 'Settings', routerLink: `/collections/${collection.id}/settings`}
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/../'};
        })).subscribe();
  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.projectService.updateCollection(this.projectId, this.collectionId, value)
      .subscribe(collection => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: `Settings for collection ${collection.name} have been saved!`,
        });
        this.formGroup.markAsPristine();
      });
  }

  handleOnDelete() {
    this.confirmationService.confirm({
      message: 'Are You sure You want to delete this Collection?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteCollection(this.projectId, this.collectionId)
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: `Collection ${this.collection.name} has been deleted!`
            });
            this.router.navigate(['projects', this.projectId]);
          })
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  get name() {
    return this.formGroup.controls.name;
  }

  get description() {
    return this.formGroup.controls.description;
  }

}
