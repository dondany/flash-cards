import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {ProjectService} from "../../project-service";
import {MenuItem} from "primeng/api";
import {CollectionType} from "../../types/collection-type";
import {FlashCardType} from "../../types/flash-card-type";
import {FormBuilder, Validators} from "@angular/forms";
import {FlashCardNewFormControlType} from "./types/flash-card-new-form-group-type";
import {FlashCardUpdateFormControlType} from "./types/flash-card-update-form-group-type";

@Component({
  selector: 'fc-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  @Input('id') projectId!: number;
  @Input() collectionId!: number;

  private destroy = new Subject<void>();
  collection!: CollectionType;
  flashCards!: FlashCardType[];
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  showNewFcModal: boolean = false;
  protected addFormGroup = this.formBuilder.group<FlashCardNewFormControlType>({
    front: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    back: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  });
  items!: MenuItem[];
  flashCardInFocus?: FlashCardType;

  showUpdateFcModal: boolean = false;
  protected updateFormGroup = this.formBuilder.group<FlashCardUpdateFormControlType>({
    front: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    back: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  });

  constructor(private projectService: ProjectService,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.projectService.getCollection(this.projectId, this.collectionId)
      .pipe(takeUntil(this.destroy),
        tap((collection) => {
          this.collection = collection;
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '../../..'},
            {label: collection.projectName, routerLink: `../..`},
            {label: collection.name, routerLink: `.`}
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/home'};
        }),
        switchMap(() => this.projectService.getFlashCards(this.projectId, this.collectionId)),
        tap((flashCards) => {
          this.flashCards = flashCards;
        })
      )
      .subscribe();

    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          this.updateFc();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteFc();
        }
      }
    ]
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  showNewFlashCardModal() {
    this.showNewFcModal = true;
  }

  handleAddOnSubmit() {
    const value = this.addFormGroup.value;
    this.projectService.createFlashCard(this.projectId, this.collectionId, value)
      .subscribe((fc) => {
        this.showNewFcModal = false;
        this.addFormGroup.reset();
        this.projectService.getFlashCards(this.projectId, this.collection.id)
          .subscribe((flashCards) => {
            this.flashCards = flashCards;
          })
      })
  }

  handleUpdateOnSubmit() {
    const value = this.updateFormGroup.value;
    this.projectService.updateFlashCard(this.projectId, this.collectionId, this.flashCardInFocus!.id, value)
      .subscribe((fc) => {
        this.showUpdateFcModal = false;
        this.updateFormGroup.reset();
        this.projectService.getFlashCards(this.projectId, this.collection.id)
          .subscribe((flashCards) => {
            this.flashCards = flashCards;
          })
      })
  }

  onMenuClick(fc: FlashCardType) {
    this.flashCardInFocus = fc;
  }

  updateFc() {
    this.showUpdateFcModal = true;
    this.updateFormGroup.controls.front.setValue(this.flashCardInFocus!.front);
    this.updateFormGroup.controls.back.setValue(this.flashCardInFocus!.back);
  }

  deleteFc() {
    this.projectService.deleteFlashCard(this.projectId, this.collectionId, this.flashCardInFocus!.id)
      .subscribe(() => {
        this.projectService.getFlashCards(this.projectId, this.collection.id)
          .subscribe((flashCards) => {
            this.flashCards = flashCards;
          })
      })
  }

  get frontCreate() {
    return this.addFormGroup.controls.front;
  }

  get backCreate() {
    return this.addFormGroup.controls.back;
  }

  get frontUpdate() {
    return this.updateFormGroup.controls.front;
  }

  get backUpdate() {
    return this.updateFormGroup.controls.back;
  }
}




