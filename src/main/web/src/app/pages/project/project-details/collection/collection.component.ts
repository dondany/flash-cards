import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {ProjectService} from "../../project-service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {CollectionType} from "../../types/collection-type";
import {FlashCardType} from "../../types/flash-card-type";
import {FormBuilder, Validators} from "@angular/forms";
import {FlashCardNewFormControlType} from "./types/flash-card-new-form-group-type";

@Component({
  selector: 'fc-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  collection!: CollectionType;
  flashCards!: FlashCardType[];
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  showNewFcModal: boolean = false;
  flashCard?: FlashCardType;
  protected formGroup = this.formBuilder.group<FlashCardNewFormControlType>({
    front: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    back: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  });

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    const projectId = this.activatedRoute.snapshot.params['id'];
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    this.projectService.getCollection(projectId, collectionId)
      .pipe(takeUntil(this.destroy),
        tap((collection) => {
          this.collection = collection;
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '/projects'},
            {label: collection.projectName, routerLink: `/projects/${projectId}`},
            {label: collection.name, routerLink: `/projects/${projectId}/collections/${collectionId}` }
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/../'};
        }),
        switchMap(() => this.projectService.getFlashCards(projectId, collectionId)),
        tap((flashCards) => {
          this.flashCards = flashCards;
        })
      )
      .subscribe();
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  showNewFlashCardModal() {
    this.showNewFcModal = true;
  }

  handleOnSubmit() {
    const projectId = this.activatedRoute.snapshot.params['id'];
    const collectionId = this.activatedRoute.snapshot.params['id'];
    const value = this.formGroup.value;
    this.projectService.createFlashCard(projectId, collectionId, value)
      .subscribe((fc) => {
        this.showNewFcModal = false;
        this.formGroup.reset();
        this.projectService.getFlashCards(projectId, this.collection.id)
          .subscribe((flashCards) => {
            this.flashCards = flashCards;
          })
      })
  }
}
